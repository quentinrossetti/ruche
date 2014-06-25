// Module dependencies
var debug    = require('debug')('ruche:cli');
var fs       = require('fs');
var colors   = require('colors');
var readline = require('readline');
var rc       = require('rc')('ruche');
var util     = require('../../lib/ruche/util');
var ruche    = require('../../lib/ruche/alternatives');
var error    = require('./util/error');

/**
 * This function is a wrapper around `ruche.alternatives()`. It display the
 * availables versions of a package and prompt the user on which one to use.
 * @summary  Ask the user wicj version to use.
 * @memberOf Cli
 * @param    {object} argv An usable object of arguments and options.
 * @param    {function} callback A callback function that is executed when the
 *           output has been written. It gets one argument `(data)`.
 * @example
 * var cli = require('./lib/cli');
 * cli.alternatives(argv, function (data) {
 *   console.log(data); // output a second time
 * });
 * @see      {@link Ruche.alternatives}
 * @since    0.0.1
 * @license  [The MIT License (MIT)]{@link http://git.io/QMeU-w}
 */
var alternatives = function (argv, callback) {
  debug('cli.alternatives() called');

  var share = util.untilde(rc.dir.share + '/' + argv.package);
  // Get local packages
  fs.readdir(share, function (err, data) {
    if (err) {
      error('No %s package is not installed', argv.package);
      callback(undefined);
      return;
    }

    // On choice
    util.emitter.on('cli-alt-choice', function (answer) {
      ruche(data[answer], function (err, data) {
        console.log('Registration of %s done!', data[answer].cyan);
        if (callback !== undefined) {
          callback(data);
        }
      });
    });

    // Show a list of choices
    console.log('Available alternatives for %s:', argv.package.cyan);
    for (var i = 0; i < data.length; i++) {
      console.log('[%s] %s', i.toString().magenta, data[i]);
    }
    util.emitter.emit('cli-alt-show');

    // Prompt
    var rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question('Wich version do you want? ', function (answer) {
      rl.close();
      util.emitter.emit('cli-alt-choice', answer);
    });
  });
};

module.exports = alternatives;
