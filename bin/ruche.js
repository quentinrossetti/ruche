#!/usr/bin/env node

// Module dependencies.
var cli = require('../lib/cli');
var argv = require('minimist')(process.argv.slice(2));

// Run the command-line client.
cli.argv(argv);