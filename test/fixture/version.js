'use strict';
var fs   = require('fs');
var path = require('path');

module.exports.copyPackageJson = function () {

  var jsonOrigin = path.resolve(__dirname, '../../package.json');
  var jsonCopy   = path.resolve(__dirname, '../../.test/package.copy.json');
  fs.writeFileSync(jsonCopy, fs.readFileSync(jsonOrigin));
  return;

};

module.exports.restorePackageJson = function () {

  var jsonOrigin = path.resolve(__dirname, '../../package.json');
  var jsonCopy   = path.resolve(__dirname, '../../.test/package.copy.json');
  fs.writeFileSync(jsonOrigin, fs.readFileSync(jsonCopy));
  return;

};

module.exports.removePackageJson = function () {

  var jsonOrigin = path.resolve(__dirname, '../../package.json');
  fs.unlinkSync(jsonOrigin);
  return;

};

module.exports.corruptPackageJson = function () {

  var jsonOrigin  = path.resolve(__dirname, '../../package.json');
  var jsonCorrupt = path.resolve(__dirname, 'corrupt.json');
  fs.writeFileSync(jsonOrigin, fs.readFileSync(jsonCorrupt));
  return;

};
