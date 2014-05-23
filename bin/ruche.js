#!/usr/bin/env node

// Module dependencies.
var debug = require('debug')('ruche:bin');
var cli = require('../lib/cli');

// Run the command-line client.
cli(process.argv);