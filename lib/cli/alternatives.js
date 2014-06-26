// Module dependencies
'use strict';
var colors   = require('colors');
var debug    = require('debug')('ruche:cli');
var fs       = require('fs');
var rc       = require('rc')('ruche');
var readline = require('readline');
var cliUtil  = require('./util');
var ruche    = require('../../lib/ruche/alternatives');
var util     = require('../../lib/ruche/util');

/**
 * This function is a wrapper around `ruche.alternatives()`. It displays the
 * available versions of a package and prompt the user on which one to use.
 * @summary  Ask the user which version to use.
 * @memberOf Cli
 * @param    {object} argv An usable object of arguments and options.
 * @param    {function} callback A callback function that is executed when the
 *           output has been written. It gets one argument `(data)`.
 * @example
 * var cli = require('./lib/cli');
 * cli.alternatives(argv, function (data) {
 *   console.log(data); // output a second time
 * });
 * @fires    RucheUtil.emitter#cli-alt-show
 * @fires    RucheUtil.emitter#cli-alt-choice
 * @requires colors
 * @requires debug
 * @requires fs
 * @requires rc
 * @requires readline
 * @requires ruche/alternatives
 * @see      {@link ruche/alternatives}
 * @since    0.0.1
 * @license  [The MIT License (MIT)]{@link http://git.io/QMeU-w}
 */
var alternatives = function (argv, callback) {

  var share = util.untilde(rc.dir.share + '/' + argv.package);

  // Get local packages
  fs.readdir(share, function (err, data) {

    if (err) {
      cliUtil.error('No %s package is installed', argv.package);
      callback(undefined);
      return;
    }

    // On choice
    util.emitter.on('cli-alt-choice', function (answer) {
      ruche(data[answer], function (err, data) {
        console.log('Registration of %s done!', data[answer].cyan);
        if (callback !== undefined) {
          debug('Alternative command executed from CLI');
          callback(data);
        }
      });
    });

    // Show a list of choices
    console.log('Available alternatives for %s:', argv.package.cyan);
    for (var i = 0; i < data.length; i++) {
      console.log('[%s] %s', i.toString().magenta, data[i]);
    }
    /**
     * Emitted when the alternatives are printed to stdout.
     * @event RucheUtil.emitter#cli-alt-show
     * @type  {object}
     */
    util.emitter.emit('cli-alt-show');

    // Prompt
    var rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question('Which version do you want? ', function (answer) {
      rl.close();
      /**
       * Emitted when the alternatives are printed to stdout.
       * @event RucheUtil.emitter#cli-alt-choice
       * @type  {object}
       * @param {number} answer The number chosen by the user.
       */
      util.emitter.emit('cli-alt-choice', answer);
    });

  });

};

module.exports = alternatives;
