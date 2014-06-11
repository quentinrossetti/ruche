// Module dependencies
var debug = require('debug')('ruche:test:cli:fake');
var path = require('path');
var fs = require('fs');
var rimraf = require('rimraf');

/**
 * Fake an process.argv arary with a custom command
 * @param  {String} str Your custom command
 * @return {Array}      process.arv array
 */
var argv = function (str) {
  str = 'node ' + str;
  return str.split(' ');
};

/**
 * Fake a configuration file. Must be run before tests. It uses fsSync 
 * function to be sure the test are run with all they need, async 
 * behaviour way be a problem otherwise. It also creates a fake env under
 * .tpm/test/
 */
var rcBefore = function () {
  var fileRead = path.resolve(__dirname, 'config');
  var fileCopy = path.resolve(__dirname, '../../.rucherc');
  fs.writeFileSync(fileCopy, fs.readFileSync(fileRead));
  fs.mkdirSync(path.resolve(__dirname, '../../.tmp'));
  fs.mkdirSync(path.resolve(__dirname, '../../.tmp/test'));
  fs.mkdirSync(path.resolve(__dirname, '../../.tmp/test/share'));
  fs.mkdirSync(path.resolve(__dirname, '../../.tmp/test/bin'));
  fs.mkdirSync(path.resolve(__dirname, '../../.tmp/test/etc'));
  fs.mkdirSync(path.resolve(__dirname, '../../.tmp/test/tmp'));
  fs.mkdirSync(path.resolve(__dirname, '../../.tmp/test/var'));
  fs.mkdirSync(path.resolve(__dirname, '../../.tmp/test/var/run'));
  fs.mkdirSync(path.resolve(__dirname, '../../.tmp/test/var/www'));
  fs.mkdirSync(path.resolve(__dirname, '../../.tmp/test/var/db'));
};

/**
 * Delete the fake configuration file and the fake environement. Must be 
 * run after the test.
 */
var rcAfter = function () {
  fs.unlinkSync(path.resolve(__dirname, '../../.rucherc'));
  rimraf.sync(path.resolve(__dirname, '../../.tmp'));
};

module.exports.argv = argv;
module.exports.rcBefore = rcBefore;
module.exports.rcAfter = rcAfter;