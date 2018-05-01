#!/usr/bin/env node

const child_process = require('child_process');
const chroot = require('chroot');

const forked = child_process.fork('chroot_helper.js');

forked.send({ chroot: __dirname + "/chroot", user: "abakken", script: "child.js" });
