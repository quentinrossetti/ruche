#!/usr/bin/env node
// Module dependencies.
var _ = require('underscore');
if (_.contains(process.argv, '--verbose') || _.contains(process.argv, '-v')) {
  process.env.DEBUG = 'ruche*';
}
var debug = require('debug')('ruche:bin');
var cli = require('../lib/cli');

// Run the command-line client.
cli(process.argv);