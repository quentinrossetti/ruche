// Module dependencies.
var debug = require('debug')('ruche:cli');
var ruche = require('../ruche');
var argvParse = require('./argv');

/**
 * Interface between the binary and the ruche module
 * @param  {Object} argv A yargs.argv object.
 */
var cli = function (argv) {
  argv = argvParse(argv);

  // Listeners
  require('./version');
  require('./help');
  require('./install')(argv.packages);
  debug('All CLI listeners registered');

  // Execution
  if (argv.context === 'version') {
    debug('Call to version');
    ruche.version();
  } else if (argv.context === 'help') {
    debug('Call to help');
    ruche.help(argv.help);  
  } else if (argv.context === 'install') {
    debug('Call to install');
    require('./install');
    ruche.install(argv.packages);
  }

  return argv;
};

module.exports = cli;

// For BDD test purpose
module.exports.argv = argvParse;