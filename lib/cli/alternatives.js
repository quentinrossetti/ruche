// Module dependencies
'use strict';
var colors   = require('colors');
var debug    = require('debug')('ruche:cli');
var fs       = require('fs');
var rc       = require('rc')('ruche');
var readline = require('readline');
var cliUtil  = require('./util');
var ruche    = require('../ruche/alternatives');
var util     = require('../ruche/util');

// Ask the user which version to use.
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
        debug('Alternative command executed from CLI');

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
