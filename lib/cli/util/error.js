// Module dependencies
var emitter = require('../../ruche/util/emitter');
var colors = require('colors');

/**
 * This function logs a colorful error to `stdoud`.
 * @summary  Display an error.
 * @memberOf CliUtil
 * @param    {Error} err The error to log
 * @return   {string} The message of the error
 * @example
 * var cliUtil = require('./lib/cli/util');
 * var e = new Error('Nop!');
 * cliUtil.error(e);
 * @requires debug
 * @requires colors
 * @since    0.0.1
 * @license  [The MIT License (MIT)]{@link http://git.io/QMeU-w}
 */
var error = function (err) {
  var r = 'Error: '.red + err.message;
  console.log(r);
  return r;
};

module.exports = error;
