// Module dependencies
'use strict';
var _     = require('underscore');
var debug = require('debug')('ruche:cli');
var yargs = require('yargs');
var util  = require('../../ruche/util');

// Parse the input from command line into an object.
var argv = function (argv) {

  argv = yargs
    .alias('V', 'version')
    .alias('h', 'help')
    .alias('v', 'verbose')
    .alias('q', 'quiet')
    .boolean(['version', 'help', 'verbose', 'quiet', 'keep'])
    .parse(argv);

  // Unknown command
  if (!_.contains(_.keys(util.valid()), argv._[2])) {
    debug('Unknown command:' + argv._[2]);
    argv.context = 'help';
    argv.help = 'global';
  } else {
    argv.context = argv._[2];
  }

  // Set the packages
  argv.packages = argv._.slice(3);
  argv.package = argv.packages[0];

  // Invalid usage
  if (_.isEmpty(argv.packages)) {
    argv.context = 'help';
    argv.help = argv.context;
  }
  if (argv.context === 'alternatives' && argv.packages.length > 1) {
    argv.context = 'help';
    argv.help = argv.context;
  }

  // Help option
  if (argv.help) {
    argv.context = 'help';
    // No or unknown command
    if (_.isEmpty(argv._) || !_.contains(_.keys(util.valid()), argv._[2])) {
      debug('Parse help for no or unknown command:' + argv._[2]);
      argv.help = 'global';
    // Known command
    } else {
      debug('Parse known command: ' + argv._[2]);
      argv.help = argv._[2];
    }
  }

  // Version
  if (argv.version) {
    argv.context = 'version';
  }

  return argv;
};

module.exports = argv;
