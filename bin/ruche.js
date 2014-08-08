#!/usr/bin/env node

// Will print debug information if --verbose is set
var _ = require('underscore');
if (_.contains(process.argv, '--verbose') || _.contains(process.argv, '-v')) {
  process.env.DEBUG = 'ruche*';
}

// Module dependencies
var debug = require('debug')('ruche:bin');
var cli   = require('../lib/cli');

// Run the command-line client
debug('Invoking ruche from command-line');
cli(process.argv);
