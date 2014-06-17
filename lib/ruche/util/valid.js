// Module dependencies
'use strict';
var debug = require('debug')('ruche:valid');

/**
 * @namespace RucheUtil.valid
 */

/**
 * Returns a flat array of valid commands.
 * @summary  Returns valid commands
 * @memberOf RucheUtil.valid
 * @example
 * var rucheUtil = require('./lib/ruche/util');
 * rucheUtil.valid.commands(); // [ 'install', 'uninstall', 'alternatives' ]
 * @requires debug
 * @since    0.0.1
 * @license  [The MIT License (MIT)]{@link http://git.io/QMeU-w}
 */
var commands = function () {
  var valid = ['install', 'uninstall', 'alternatives'];
  debug('Valid commands: %s', valid);
  return valid;
};

/**
 * Returns an object of valid options for each commands or context. Each
 * key in the object is a context and each value an array of valid options.
 * @summary  Returns valid options
 * @memberOf RucheUtil.valid
 * @example
 * var rucheUtil = require('./lib/ruche/util');
 * // Get the valid options of the `alternatives` command
 * rucheUtil.valid.options().alternatives; // [ 'choice' ]
 * @requires debug
 * @since    0.0.1
 * @license  [The MIT License (MIT)]{@link http://git.io/QMeU-w}
 */
var options = function () {
  var valid = {
    'global': ['help', 'version', 'verbose', 'quiet', 'silent'],
    'install': [],
    'uninstall': [],
    'alternatives': ['choice']
  };
  debug('Valid options: %j', valid);
  return valid;
};

module.exports.commands = commands;
module.exports.options = options;
