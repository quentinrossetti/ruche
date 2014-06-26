// Module dependencies.
'use strict';
var debug = require('debug')('ruche:cli');
var argvParse = require('./util/argv');

/**
 * @class Cli
 */
var Cli = {};

/**
 * Interface between the binary and the ruche module
 * @param  {Object} argv A yargs.argv object.
 */
var cli = function (argv) {
  argv = argvParse(argv);

  // Mute stdout for quiet execution
  if (argv.quiet) {
    process.stdout.write = function () {
      // Do no print.
    }
  };

  // Version
  if (argv.context === 'version') {
    require('./version')();
    return 'version';

  // Help
  } else if (argv.context === 'help') {
    debug('Call to help');
    require('./help')(argv.help);
    return 'help';

  // Install
  } else if (argv.context === 'install') {
    debug('Call to install');
    require('./install')(argv);
    return 'install';

  // Uninstall
  } else if (argv.context === 'uninstall') {
    debug('Call to uninstall');
    require('./uninstall')(argv);
    return 'uninstall';

  // Alternatives
  } else if (argv.context === 'alternatives') {
    debug('Call to alternatives');
    require('./alternatives')(argv);
    return 'alternatives';
  }

  return argv;
};

module.exports              = cli;
module.exports.version      = require('./version');
module.exports.help         = require('./help');
module.exports.install      = require('./install');
module.exports.uninstall    = require('./uninstall');
module.exports.alternatives = require('./alternatives');
