#!/usr/bin/env node

// Module dependencies.
var debug = require('debug')('ruche:bin');
var argv = require('yargs')
  .alias('v', 'version')
  .alias('h', 'help')
  .alias('V', 'verbose')
  .alias('q', 'quiet')
  .alias('k', 'keep')
  .boolean(['version', 'help', 'verbose', 'quiet', 'keep'])
  .argv;
var cli = require('../lib/cli');

// Run the command-line client.
cli(argv);