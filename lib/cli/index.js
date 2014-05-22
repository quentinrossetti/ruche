// Module dependencies.
var debug = require('debug')('cli');
var ruche = require('../ruche');
var emitter = require('../ruche/util/emitter');

/**
 * Interface between the binary and the ruche module
 * @param  {Object} argv A yargs.argv object.
 * @return {*}
 */
var cli = function (argv) {
  argv = require('./argv')(argv);

  // Version
  if (argv.context === 'version') {
    debug('context: version');
    console.log(ruche.version());
  } else
  // Help
  if (argv.context === 'help') {
    ruche.help(argv.help);
    emitter.on('ruche:module:help', function (data) {
      console.log(data);
    });
  }
  return argv;
};

module.exports = cli;