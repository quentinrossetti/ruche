// Module dependencies
'use strict';
var debug = require('debug')('ruche:cli:argv');
var yargs = require('yargs');
var _     = require('underscore');
var valid = require('../../ruche/util/valid');

/**
 * This function parse the command from `stdin` into an object that is usable
 * by the Cli.
 * @summary  Parse the input from command line into an object.
 * @memberOf CliUtil
 * @param    {object} argv From `stdin`.
 * @return   {object} An usable object of arguments and options.
 * @example
 * var cliUtil = require('./lib/cli/util');
 * var args = cliUtil.argv(process.argv);
 * @requires debug
 * @requires yargs
 * @requires underscore
 * @see      {@link Cli}
 * @since    0.0.1
 * @license  [The MIT License (MIT)]{@link http://git.io/QMeU-w}
 */
var argv = function (argv) {

  argv = yargs
    .alias('V', 'version')
    .alias('h', 'help')
    .alias('v', 'verbose')
    .alias('q', 'quiet')
    .boolean(['version', 'help', 'verbose', 'quiet', 'keep'])
    .parse(argv);

  // Unknown command
  if (!_.contains(_.keys(valid()), argv._[2])) {
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
    if (_.isEmpty(argv._) || !_.contains(_.keys(valid()), argv._[2])) {
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
