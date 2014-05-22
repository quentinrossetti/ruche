// Module dependencies.
var debug = require('debug')('ruche:cli');
var ruche = require('../ruche');
var emitter = require('../ruche/util/emitter');

/**
 * Interface between the binary and the ruche module
 * @param  {Object} argv A yargs.argv object.
 */
var cli = function (argv) {
  argv = require('./argv')(argv);

  // Version
  if (argv.context === 'version') {
    ruche.version();
    emitter.on('version', function (data) {
      console.log(data);
    });
  } else
  // Help
  if (argv.context === 'help') {
    ruche.help(argv.help);
    emitter.on('help', function (data) {
      console.log(data);
    });
  }
};

module.exports = cli;