// Module dependencies
'use strict';
var debug = require('debug')('ruche:cli:help');
var ruche = require('../ruche/help');
var error = require('./util/error');

/**
 * This function is a wrapper around `ruche.help()`. It output the appropriate
 * *ruche* help to `stdin` according to the context.
 * @summary  Output the help to sdtin
 * @memberOf Cli
 * @param    {string} The context of the wanted help. It should be a valid
 *           **ruche** command or ``global`.
 * @param    {function} callback A callback function that is executed when the
 *           output has been written. It gets one argument `(data)` where
 *           `data` is the help as a string.
 * @example
 * var cli = require('./lib/cli');
 * cli.help(function (data) {
 *   console.log(data); // output a second time
 * });
 * @see      {@link Ruche.help}
 * @since    0.0.1
 * @license  [The MIT License (MIT)]{@link http://git.io/QMeU-w}
 */
var help = function (context, callback) {
  debug('cli.help(\'%s\') called', context);
  ruche(context, function (err, data) {
    if (err) {
      error.handle(err);
    }

    console.log(data);

    if (callback !== undefined) {
      callback();
    }
  });

};

module.exports = help;
