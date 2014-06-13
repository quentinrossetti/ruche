// Module dependencies.
'use strict';
var debug = require('debug')('ruche:cli');
var colors = require('colors');
var ruche = require('../ruche');
var argvParse = require('./util/argv');
var emitter = require('../ruche/util/emitter');

/**
 * @namespace Cli
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
    var StdOutFixture = require('fixture-stdout');
    var fixture = new StdOutFixture();
    var _writes = [];
    fixture.capture(function (string, encoding, fd) {
      _writes.push({
        string: string,
        encoding: encoding,
        fd: fd
      });
      // Prevent the write to the original stdout stream
      return false;
    });
  };

  // Version
  if (argv.context === 'version') {
    require('./version')();

  // Help
  } else if (argv.context === 'help') {
    debug('Call to help');
    require('./help')(argv.help);

  // Install
  } else if (argv.context === 'install') {
    debug('Call to install');
    if (!argv.quiet) {
      require('./install')(argv);
    }

  // Uninstall
  } else if (argv.context === 'uninstall') {
    debug('Call to uninstall');
    if (!argv.quiet) {
      require('./uninstall')(argv);
    }

  // Alternatives
  } else if (argv.context === 'alternatives') {
    debug('Call to alternatives');
    if (!argv.quiet) {
      require('./alternatives')(argv);
    }
  }

  return argv;
};

module.exports              = cli;
module.exports.argv         = require('./util/argv');
module.exports.version      = require('./version');
module.exports.help         = require('./help');
module.exports.install      = require('./install');
module.exports.uninstall    = require('./uninstall');
module.exports.alternatives = require('./alternatives');
