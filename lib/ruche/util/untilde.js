// Module dependencies
'use strict';
var debug = require('debug')('ruche');
var path  = require('path');

/**
 * Makes a tilded path node-compatible.
 * @param  {String} path The path.
 * @return {String}      Untilded path.
 */
/**
 * Parse a sting and convert it into a valid path. Different symbols can be
 * added: `~` represents the home directory of the user (like:
 * `C:/Users/MyProfile`). `@` represents the installation folder of the current
 * **ruche** installation.
 * @summary  Parse a sting and convert it into a valid path
 * @memberOf RucheUtil
 * @param    {string} path The string to parse.
 * @return   {string} Return the resolved path.
 * @example
 * var rucheUtil = require('./lib/ruche/util');
 * var home = rucheUtil.untilde('~'); // user home directory
 * var root = rucheUtil.untilde('@'); // ruche root
 * @requires debug
 * @requires path
 * @since    0.0.1
 * @license  [The MIT License (MIT)]{@link http://git.io/QMeU-w}
 */
var untilde = function (p) {
  var home;

  // ~ means user directory
  if (p.substr(0,1) === '~') {
    home = process.env.HOME || process.env.USERPROFILE;
    p = home + p.substr(1);

  // @ means ruche install directory
  } else if (p.substr(0,1) === '@') {
    home = path.resolve(__dirname, '../../..');
    p = home + p.substr(1);
  }

  debug('Path resolved: %s', p);
  return path.resolve(p);
};

module.exports = untilde;
