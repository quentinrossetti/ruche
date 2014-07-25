'use strict';
var fs     = require('fs');
var path   = require('path');
var rimraf = require('rimraf');

module.exports.before = function () {

  var testDir = path.resolve(__dirname, '../../.test');
  fs.mkdirSync(testDir);
  return;

};

module.exports.after = function () {

  var testDir = path.resolve(__dirname, '../../.test');
  rimraf.sync(testDir);
  return;

};
