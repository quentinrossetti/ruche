// Module dependencies.
var _ = require('underscore');

/**
 * Inspects the arguments and calls the appropriate action.
 *
 * @param {Object} argv A yargs.argv object.
 * @param {Function} callback Triggered on completion.
 * @return {Object} An arguments object.
 */
var argv = function (argv, callback) {
  
  // optional callback
  callback = callback || function() {};
  
  // Set the context context
  // When --version
  if (argv.version) { 
    argv.context = 'version';
  // When no command
  } else if (_.isEmpty(argv._)) {
    argv.context = 'help';
    argv.help = 'global';
  // When --help
  } else if (argv.help) {
    argv.context = 'help';
    argv.help = argv._[0];
  // When command
  } else {
    argv.context = argv._[0];
  }

  // Set the packages
  argv.packages = argv._.slice(1)

  return argv;
}

module.exports = argv;