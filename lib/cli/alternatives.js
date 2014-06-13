// Module dependencies.
var debug = require('debug')('ruche:cli:alternatives');
var colors = require('colors');
var readline = require('readline');
var emitter = require('../../lib/ruche/util/emitter');

/**
 * Prompt for alternatives
 * @param  {Object} argv A yargs.argv object
 * @fires  RucheEmitter#alt-choice
 */
var alternatives = function (argv) {

  // Log success
  emitter.on('reg-done-alt', function (alt) {
    var long = alt.package + '-' + alt.version + '-' + alt.platform;
    console.log('Registration of %s done!', long.cyan);
  });

  // Show a list of choices
  emitter.on('alt-show', function (data) {
    console.log('Available alternatives for %s:', argv.package.cyan);
    for (var i = 0; i < data.length; i++) {
      console.log('[%s] %s', i.toString().magenta, data[i]);
    }
    var rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question('Wich version do you want? ', function (answer) {
      rl.close();
      emitter.emit('alt-choice', data[answer]);
    });
  });
};

module.exports = alternatives;
