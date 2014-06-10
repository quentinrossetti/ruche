// Module dependencies.
var debug = require('debug')('ruche:cli:argv');
var yargs = require('yargs');
var _ = require('underscore');
var valid = require('../ruche/util/valid');

/**
 * Inspects the arguments and calls the appropriate action.
 *
 * @param {Object} argv A yargs.argv object.
 * @return {Object} An arguments object.
 */
var argv = function (argv) {

  argv = yargs
    .alias('V', 'version')
    .alias('h', 'help')
    .alias('v', 'verbose')
    .alias('q', 'quiet')
    .alias('k', 'keep')
    .boolean(['version', 'help', 'verbose', 'quiet', 'keep'])
    .parse(argv);

  // Unknown command
  if (!_.contains(valid.commands(), argv._[2])) {
    debug('Unknown command:' + argv._[2])
    argv.context = 'help';
    argv.help = 'global';
  } else {
    argv.context = argv._[2];
  }

  // Set the packages
  argv.packages = argv._.slice(3)

  // Invalid usage
  if (argv.context === 'install' 
    || argv.context === 'uninstall' 
    || argv.context === 'alternatives'
    ) {
    if (_.isEmpty(argv.packages)) {
      argv.context = 'help';
      argv.help = argv.context;
    }
  }
   
  // Help option
  if (argv.help) {
    argv.context = 'help';
    // No or unknown command
    if (_.isEmpty(argv._) || !_.contains(valid.commands(), argv._[2])) {
      debug('Parse help for no or unknown command:' + argv._[2])
      argv.help = 'global';
    // Known command
    } else {
      debug('Parse known command: ' + argv._[2])
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