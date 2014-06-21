// Module dependencies
'use strict';
var debug = require('debug')('ruche:valid');

/**
 * Returns an object of valid options for each commands or context. Each
 * key in the object is a context and each value an array of valid options.
 * @summary  Returns valid options
 * @memberOf RucheUtil
 * @example
 * var rucheUtil = require('./lib/ruche/util');
 * // Get the valid options of the `alternatives` command
 * rucheUtil.valid().alternatives; // [ 'choice' ]
 * @requires debug
 * @since    0.0.1
 * @license  [The MIT License (MIT)]{@link http://git.io/QMeU-w}
 */
var valid = function () {
  var r = {
    'global': ['help', 'version', 'verbose', 'quiet', 'silent'],
    'install': [],
    'uninstall': [],
    'alternatives': ['choice']
  };
  debug('Valid options: %j', r);
  return r;
};

module.exports = valid;
