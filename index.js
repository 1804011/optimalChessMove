const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());
app.get("/chess", async (req, res) => {
    const { board } = req?.query;
    console.log(board);
    const { spawn } = require('child_process');
    const child = spawn('stockfish');
    child.stdin.write('uci\n');
    child.stdin.write('setoption name MultiPV value 1\n');
    child.stdin.write('setoption name Contempt value 24\n');
    child.stdin.write('setoption name Threads value 1\n');
    child.stdin.write(`position fen ${board}\n`)
    child.stdin.write(`go movetime 5000\n`);

    child.stdout.on('data', (data) => {
        console.clear()
        last = data.toString();
        const txt = last.split(" ");
        const bestMove = txt[txt.length - 3];
        const tt = txt[txt.length - 4].split("\n")[1];
        if (tt == "bestmove") {
            res.send({ bestMove })
        }


    })




    child.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        res.send({
            status: "failed",

        })
    });

    child.on('close', (code) => {

        console.log(`child process exited with code ${code}`);
    });

})
app.get("/", (req, res) => res.send("welcome to optimal chess move generator"))
app.listen(port, () => console.log("listening"))