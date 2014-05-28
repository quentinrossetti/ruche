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
    require('./version');
    ruche.version();

  // Help
  } else if (argv.context === 'help') {
    debug('Call to help');
    require('./help');
    ruche.help(argv.help);

  // Install
  } else if (argv.context === 'install') {
    debug('Call to install');
    require('./install')(argv.packages);
    ruche.install(argv.packages);
  }

  return argv;
};

module.exports = cli;

// For BDD test purpose
module.exports.argv = argvParse;