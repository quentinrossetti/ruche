// Module dependencies.
var debug = require('debug')('ruche:help');
var fs = require('fs');
var path = require('path');
var valid = require('./util/valid');

/**
 * Get the local text help file content according to the specified `context`. 
 * This function gets one or two arguments, in all cases the last is a 
 * *callback* function. When only one argument is given it gets the global 
 * **ruche** help.
 * @summary  Get the help
 * @memberOf Ruche
 * @param    {string} [context] The context of the wanted help. It could be 
 *           either `'global'`, `undefined`, or a valid **ruche** command.
 * @param    {function} callback A callback function that is executed when the 
 *           help file is loaded. It gets two arguments `(err, data)` where 
 *           `data` is the content of the help file.
 * @example
 * var ruche = require('ruche');
 * // one argument
 * ruche.version(function (err, data) {
 *   if (err) { // handle your error }
 *   console.log(data); // output the ruche help
 * });
 * // two arguments
 * ruche.version('install', function (err, data) {
 *   if (err) { // handle your error }
 *   console.log(data); // output the install command help
 * });
 * @throws   Can't read the help file
 * @requires debug
 * @requires fs
 * @requires path
 * @since    0.0.1
 * @license  [The MIT License (MIT)]{@link http://git.io/QMeU-w}
 */
var help = function (context, callback) {
  debug('ruche.help() called');
  var e;

  // Optional context
  if (arguments.length === 1) {
    callback = context;
    context = 'global';
  }
  
  // Define the help file
  if (context === 'global') {
    var file = 'help.txt';
  } else {
    var file = 'help-' + context + '.txt';
  }

  file = path.resolve(__dirname, '../../doc/cli/' + file);
  fs.readFile(file, { encoding: 'utf8'}, function (err, data) {
    if (err) {
      e = new Error('Can\'t read the help file');
      callback(e, undefined);
      return;
    };

    debug('Help for %s', context);
    callback(e, data);
  });
};

module.exports = help;