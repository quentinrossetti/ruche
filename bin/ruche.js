#!/usr/bin/env node

// Module dependencies.
var argv = require('minimist')(process.argv.slice(2));
var cli = require('../lib/cli');

// Run the command-line client.
cli.argv(argv);