// Module dependencies
var debug = require('debug')('ruche:test:fixture:error');
var fs = require('fs');
var path = require('path');

var packageInvalidBefore = function () {
  var fileRead;
  var fileCopy;
  // Copy original package.json
  fileRead = path.resolve(__dirname, '../../package.json');
  fileCopy = path.resolve(__dirname, '../../.tmp/test/packageOrginal.json');
  fs.writeFileSync(fileCopy, fs.readFileSync(fileRead));
  // Replace by broken package.json
  fileRead = path.resolve(__dirname, 'packageBroken.json');
  fileCopy = path.resolve(__dirname, '../../package.json');
  fs.writeFileSync(fileCopy, fs.readFileSync(fileRead));
}

var packageUnreachableBefore = function () {
  var fileRead;
  var fileCopy;
  // Copy original package.json
  fileRead = path.resolve(__dirname, '../../package.json');
  fileCopy = path.resolve(__dirname, '../../.tmp/test/packageOrginal.json');
  fs.writeFileSync(fileCopy, fs.readFileSync(fileRead));
  // Delete package.json
  fs.unlinkSync(fileRead);
}

var packageAfter = function () {
  var fileRead;
  var fileCopy;
  // Restore original package.json
  fileRead = path.resolve(__dirname, '../../.tmp/test/packageOrginal.json');
  fileCopy = path.resolve(__dirname, '../../package.json');
  fs.writeFileSync(fileCopy, fs.readFileSync(fileRead));
}

var helpUnreachableBefore = function () {
  var fileRead;
  var fileCopy;
  // Copy original help file
  fileRead = path.resolve(__dirname, '../../doc/cli/help.txt');
  fileCopy = path.resolve(__dirname, '../../.tmp/test/help.txt');
  fs.writeFileSync(fileCopy, fs.readFileSync(fileRead));
  // Delete help file
  fs.unlinkSync(fileRead);
}

var helpAfter = function () {
  var fileRead;
  var fileCopy;
  // Restore original package.json
  fileRead = path.resolve(__dirname, '../../.tmp/test/help.txt');
  fileCopy = path.resolve(__dirname, '../../doc/cli/help.txt');
  fs.writeFileSync(fileCopy, fs.readFileSync(fileRead));
}

module.exports.packageInvalidBefore     = packageInvalidBefore;
module.exports.packageUnreachableBefore = packageUnreachableBefore;
module.exports.packageAfter             = packageAfter;
module.exports.helpUnreachableBefore    = helpUnreachableBefore;
module.exports.helpAfter                = helpAfter;