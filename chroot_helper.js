const posix = require('posix');
const fs = require('fs');

process.on('message', (msg) => {
    let script = fs.readFileSync(msg.script, "utf8");

    var pwd;
    if (msg.user) {
        try {
            pwd = posix.getpwnam(msg.user);
        } catch(err) {
            console.error("Couldn't find user", msg.user);
            throw err;
        }

        try {
            process.initgroups(msg.user, pwd.gid);
        } catch(err) {
            throw new Error('changing groups failed: ' + err.message);
        }
    }

    console.log(msg);
    try {
        posix.chroot(msg.chroot);
    } catch (err) {
        console.error('changing root or user failed', err);
        process.exit(1);
    }

    if (pwd) {
        process.setgid(pwd.gid);
        process.setuid(pwd.uid);
    }
    eval(script);
});
