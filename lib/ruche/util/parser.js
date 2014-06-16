// Module dependencies.
var path = require('path');

/**
 * Makes a tilded path node-compatible.
 * @param  {String} path The path.
 * @return {String}      Untilded path.
 */
var untilde = function (p) {
  var homedir;
  var p;

  // ~ means user directory
  if (p.substr(0,1) === '~') {
    homedir = process.env.USERPROFILE;
    p = homedir + p.substr(1)

  // @ means ruche install directory
  } else if (p.substr(0,1) === '@') {
    homedir = path.resolve(__dirname, '../../..');
    p = homedir + p.substr(1);
  }

  return path.resolve(p);
};

module.exports.untilde = untilde;
