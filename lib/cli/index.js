// Module dependencies.
var debug = require('debug')('ruche:cli');
var ruche = require('../ruche');

/**
 * Interface between the binary and the ruche module
 * @param  {Object} argv A yargs.argv object.
 */
var cli = function (argv) {
  argv = require('./argv')(argv);

  // Listeners
  require('./version');
  require('./help');
  require('./install');

  // Execution
  if (argv.context === 'version') {
    ruche.version();
  } else if (argv.context === 'help') {
    ruche.help(argv.help);  
  } else if (argv.context === 'install') {
    ruche.install(argv.packages);
  }

  return ruche;
};

module.exports = cli;