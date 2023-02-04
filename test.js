const { spawn, exec } = require('child_process');
// const child = spawn('process')
// child.stdin.write('5 6 \n')
// child.stdout.on('data', (data) => console.log(data?.toString()))
for (let i = 0; i < 2; i++) {
    console.clear()
    let child = null;
    if (i == 0) {
        child = spawn('cmd');
        child.stdin.write('g++ process.cpp -o process\n');
        child.kill()

    }
    else {
        child = spawn('process')
        child.stdin.write('5 6 \n')


    }
    child?.stdout.on('data', (data) => {
        if (i == 1) {
            console.log(data?.toString());
        }
    })

    child?.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    child?.on('close', (code) => {
        console.log(`child process exited with code ${code}`);

    });
}








