const child_process = require('child_process');
const fs = require('fs');

child_process.exec('/tree', (err, stdout, stderr) => {
    if (err) {
        console.error(`exec error: ${err}`);
        return;
    }

    console.log(`/tree:\n${stdout}`);
    fs.writeFileSync("/fisk", "balle");
});

