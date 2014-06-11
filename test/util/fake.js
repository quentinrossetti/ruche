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
  var file = path.resolve('./test/util/config');
  fs.writeFileSync('./.rucherc', fs.readFileSync(file));
  fs.mkdirSync('.tmp');
  fs.mkdirSync('.tmp/test');
  fs.mkdirSync('.tmp/test/share');
  fs.mkdirSync('.tmp/test/bin');
  fs.mkdirSync('.tmp/test/etc');
  fs.mkdirSync('.tmp/test/tmp');
  fs.mkdirSync('.tmp/test/var');
  fs.mkdirSync('.tmp/test/var/run');
  fs.mkdirSync('.tmp/test/var/www');
  fs.mkdirSync('.tmp/test/var/db');
};

/**
 * Delete the fake configuration file and the fake environement. Must be 
 * run after the test.
 */
var rcAfter = function () {
  fs.unlinkSync('./.rucherc');
  rimraf.sync('.tmp');
};

module.exports.argv = argv;
module.exports.rcBefore = rcBefore;
module.exports.rcAfter = rcAfter;