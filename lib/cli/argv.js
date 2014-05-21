/**
 * Inspects the arguments and calls the appropriate action.
 *
 * @param {Object} argv An optimist.argv object.
 * @param {Function} callback Triggered on completion.
 * @return {Object} An arguments object.
 */
var argv = function (argv, callback) {
  
  // optional callback
  callback = callback || function() {};

  // --version or -v
  argv.version = argv.version || argv.v;
    // --help or -v
  argv.help = argv.help || argv.h;
  // --silent or --quiet ou -q
  argv.silent = argv.silent || argv.quiet || argv.q;
  // --verbose or -V
  argv.verbose = argv.verbose || argv.V;

  return argv;
}

module.exports = argv;