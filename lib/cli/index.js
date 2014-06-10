// Module dependencies.
var debug = require('debug')('ruche:cli');
var colors = require('colors');
var ruche = require('../ruche');
var argvParse = require('./argv');
var emitter = require('../ruche/util/emitter');

/**
 * Interface between the binary and the ruche module
 * @param  {Object} argv A yargs.argv object.
 */
var cli = function (argv) {
  argv = argvParse(argv);

  emitter.on('error', function (message) {
    console.log('Error: '.red + message);
  });

  // Version
  if (argv.context === 'version') {
    debug('Call to version');
    if (!argv.quiet) {
      require('./version');
    }
    ruche.version();

  // Help
  } else if (argv.context === 'help') {
    debug('Call to help');
    if (!argv.quiet) {
      require('./help');
    }
    ruche.help(argv.help);

  // Install
  } else if (argv.context === 'install') {
    debug('Call to install');
    if (!argv.quiet) {
      require('./install')(argv);
    }
    ruche.install(argv.packages);

  // Uninstall
  } else if (argv.context === 'uninstall') {
    debug('Call to uninstall');
    if (!argv.quiet) {
      require('./uninstall')(argv);
    }
    ruche.uninstall(argv.packages);

  // Alternatives
  } else if (argv.context === 'alternatives') {
    debug('Call to alternatives');
    if (!argv.quiet) {
      require('./alternatives')(argv);
    }
    ruche.alternatives(argv.package);
  }

  return argv;
};

module.exports = cli;

// For BDD test purpose
module.exports.argv = argvParse;