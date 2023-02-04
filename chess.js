const fen = 'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq - 0 1'
const { spawn } = require('child_process');
const child = spawn('stockfish');
// child.stdin.write('uci\n');
// child.stdin.write('setoption name MultiPV value 1\n');
// // child.stdin.write('setoption name Contempt value 24\n');
// child.stdin.write('setoption name Threads value 1\n');
child.stdin.write(`position fen ${fen}\n`)
child.stdin.write(`go movetime 5000\n`)

let last = null

child.stdout.on('data', (data) => {
    console.clear()
    console.log(data.toString());

})


child.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});

child.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});
