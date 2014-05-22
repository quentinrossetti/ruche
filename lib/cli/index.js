// Module dependencies.
var debug = require('debug')('cli');
var ruche = require('../ruche');

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
    console.log(ruche.help(argv.help));
  }
  return argv;
};

module.exports = cli;