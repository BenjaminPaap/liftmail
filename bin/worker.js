#!/usr/bin/env node

var commander = require('commander');

// Parse commandline arguments
commander.usage('<configuration-file>').parse(process.argv);

if (commander.args.length == 0) {
    throw new Error('Please provide a configuration file');
}

// New liftmail instance
var liftmail = new (require('../lib/node/Liftmail.js'))(commander.args[0]);

// Listen to queue
//liftmail.queue.receive();