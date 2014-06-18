// Module dependencies
'use strict';
var debug = require('debug')('ruche:test:fixture');
var fs    = require('fs');
var path  = require('path');

/**
 * Fixture: Fake an invalid package.json
 */
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
  debug('Fake an invalid package.json');
};

/**
 * Fixture: Fake a missing package.json
 */
var packageUnreachableBefore = function () {
  var fileRead;
  var fileCopy;
  // Copy original package.json
  fileRead = path.resolve(__dirname, '../../package.json');
  fileCopy = path.resolve(__dirname, '../../.tmp/test/packageOrginal.json');
  fs.writeFileSync(fileCopy, fs.readFileSync(fileRead));
  // Delete package.json
  fs.unlinkSync(fileRead);
  debug('Fake a missing package.json');
};

/**
 * Fixture: Restore original package.json
 */
var packageAfter = function () {
  var fileRead;
  var fileCopy;
  // Restore original package.json
  fileRead = path.resolve(__dirname, '../../.tmp/test/packageOrginal.json');
  fileCopy = path.resolve(__dirname, '../../package.json');
  fs.writeFileSync(fileCopy, fs.readFileSync(fileRead));
  debug('Restore original package.json');
};

/**
 * Fixture: Fake a missing help file
 */
var helpUnreachableBefore = function () {
  var fileRead;
  var fileCopy;
  // Copy original help file
  fileRead = path.resolve(__dirname, '../../doc/cli/help.txt');
  fileCopy = path.resolve(__dirname, '../../.tmp/test/help.txt');
  fs.writeFileSync(fileCopy, fs.readFileSync(fileRead));
  // Delete help file
  fs.unlinkSync(fileRead);
  debug('Fake a missing help file');
};

/**
 * Fixture: Restaure the orginal help file
 */
var helpAfter = function () {
  var fileRead;
  var fileCopy;
  // Restore original package.json
  fileRead = path.resolve(__dirname, '../../.tmp/test/help.txt');
  fileCopy = path.resolve(__dirname, '../../doc/cli/help.txt');
  fs.writeFileSync(fileCopy, fs.readFileSync(fileRead));
  debug('Restaure the orginal help file');
};

/**
 * Fixture: Remove the fake download
 */
var extractBefore = function () {
  var copyPath   = '../../.tmp/test/tmp/fixpack-0.0.1-win32.tar.gz';
  fs.unlinkSync(path.resolve(__dirname, copyPath));
  debug('Remove the fake download');
};

module.exports.packageInvalidBefore     = packageInvalidBefore;
module.exports.packageUnreachableBefore = packageUnreachableBefore;
module.exports.packageAfter             = packageAfter;
module.exports.helpUnreachableBefore    = helpUnreachableBefore;
module.exports.helpAfter                = helpAfter;
module.exports.extractBefore            = extractBefore;
