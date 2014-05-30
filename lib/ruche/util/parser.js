// Module dependencies.
var path = require('path');

/**
 * Makes a tilded path node-compatible.
 * @param  {String} path The path.
 * @return {String}      Untilded path.
 */
var untilde = function (p) {
  if (p.substr(0,1) === '~') {
    homedir = process.env.USERPROFILE;
    p = homedir + p.substr(1)
  }
  return path.resolve(p);
};

module.exports.untilde = untilde;