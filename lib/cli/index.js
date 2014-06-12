// Module dependencies.
var debug = require('debug')('ruche:cli');
var colors = require('colors');
var ruche = require('../ruche');
var argvParse = require('./argv');
var emitter = require('../ruche/util/emitter');

/**
 * @namespace Cli
 */

/**
 * Interface between the binary and the ruche module
 * @param  {Object} argv A yargs.argv object.
 */
var cli = function (argv) {
  argv = argvParse(argv);

  // Handle CLI errors
  emitter.on('error', function (err) {
    console.log('Error: '.red + err.message);
  });

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
    if (!argv.quiet) {
      require('./help');
    }

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

module.exports = cli;