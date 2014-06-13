// Module dependencies
'use strict';
var debug = require('debug')('ruche:cli:version');
var ruche = require('../ruche/version');
var error = require('./util/error');

/**
 * This function is a wrapper around `ruche.version()`. It output the *ruche*
 * version number to `stdin`.
 * @summary  Output the version number to sdtin
 * @memberOf Cli
 * @param    {function} callback A callback function that is executed when the
 *           output has been written. It gets one argument `(data)` where
 *           `data` is the version number: a string like this `0.0.1`.
 * @example
 * var cli = require('./lib/cli');
 * cli.version(function (data) {
 *   console.log(data); // output a second time
 * });
 * @see      {@link Ruche.version}
 * @since    0.0.1
 * @license  [The MIT License (MIT)]{@link http://git.io/QMeU-w}
 */
var version = function (callback) {
  debug('cli.version() called');
  ruche(function (err, data) {
    if (err) {
      error.handle(err);
    }

    console.log('v%s', data);

    if (callback !== undefined) {
      callback();
    }
  });

};

module.exports = version;
