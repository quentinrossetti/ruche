// Module dependencies
'use strict';
var debug = require('debug')('ruche');
var path  = require('path');

// Parse a sting and convert it into a valid path
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
