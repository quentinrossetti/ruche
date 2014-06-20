// Module dependencies
'use strict';
var debug = require('debug')('ruche:test:fixture');
var path = require('path');
var fs = require('fs');
var rimraf = require('rimraf');
var untilde = require('../../lib/ruche/util/untilde');

/**
 * Fixture: Fake a configuration env .tpm/test/. Must be run before
 * tests. It uses fsSync function to be sure the test are run with all they
 * need, async behaviour way be a problem otherwise.
 */
var before = function () {
  fs.mkdirSync(untilde('@/.tmp'));
  fs.mkdirSync(untilde('@/.tmp/test'));
  fs.mkdirSync(untilde('@/.tmp/test/share'));
  fs.mkdirSync(untilde('@/.tmp/test/bin'));
  fs.mkdirSync(untilde('@/.tmp/test/etc'));
  fs.mkdirSync(untilde('@/.tmp/test/tmp'));
  fs.mkdirSync(untilde('@/.tmp/test/var'));
  fs.mkdirSync(untilde('@/.tmp/test/var/run'));
  fs.mkdirSync(untilde('@/.tmp/test/var/www'));
  fs.mkdirSync(untilde('@/.tmp/test/var/db'));
  debug('Fake environement created');
};

/**
 * Fixture: Delete the fake environement.
 */
var after = function () {
  rimraf.sync(untilde('@/.tmp'));
  debug('Fake environement deleted');
};

/**
 * Fixture: Mimic a downloaded package
 */
var extractBefore = function (long) {
  var originPath = 'fixpack/dist/' + long + '.tar.gz';
  var copyPath   = '../../.tmp/test/tmp/' + long + '.tar.gz';
  var origin     = path.resolve(__dirname, originPath);
  var copy       = path.resolve(__dirname, copyPath);
  fs.writeFileSync(copy, fs.readFileSync(origin));
  debug('Mimic a downloaded package');
};

/**
 * Fixture: Remove registered binaries
 */
var registerAfter = function () {
  fs.unlinkSync(untilde('@/.tmp/test/bin/run0.cmd'));
  fs.unlinkSync(untilde('@/.tmp/test/bin/run1.cmd'));
  fs.unlinkSync(untilde('@/.tmp/test/bin/run2.cmd'));
  debug('Remove registered binaries');
};

var removeBefore = function () {
  fs.writeFileSync(untilde('@/.tmp/test/bin/run0.cmd'), 'test-bin');
  fs.writeFileSync(untilde('@/.tmp/test/bin/run1.cmd'), 'test-bin');
  fs.writeFileSync(untilde('@/.tmp/test/bin/run2.cmd'), 'test-bin');
  fs.mkdirSync(untilde('@/.tmp/test/etc/fixpack'));
  fs.mkdirSync(untilde('@/.tmp/test/share/fixpack'));
  fs.mkdirSync(untilde('@/.tmp/test/share/fixpack/fixpack-0.0.2-win32'));
  fs.writeFileSync(untilde('@/.tmp/test/share/fixpack/fixpack-0.0.2-win32/run'), 'test-run');
};

var removeAfter = function () {
  rimraf.sync(untilde('@/.tmp/test/share/fixpack'));
};

module.exports.before        = before;
module.exports.after         = after;
module.exports.extractBefore = extractBefore;
module.exports.registerAfter = registerAfter;
module.exports.removeBefore  = removeBefore;
