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
  fs.mkdirSync(path.resolve(__dirname, '../..', '.tmp'));
  fs.mkdirSync(path.resolve(__dirname, '../..', '.tmp/test'));
  fs.mkdirSync(path.resolve(__dirname, '../..', '.tmp/test/share'));
  fs.mkdirSync(path.resolve(__dirname, '../..', '.tmp/test/bin'));
  fs.mkdirSync(path.resolve(__dirname, '../..', '.tmp/test/etc'));
  fs.mkdirSync(path.resolve(__dirname, '../..', '.tmp/test/tmp'));
  fs.mkdirSync(path.resolve(__dirname, '../..', '.tmp/test/var'));
  fs.mkdirSync(path.resolve(__dirname, '../..', '.tmp/test/var/run'));
  fs.mkdirSync(path.resolve(__dirname, '../..', '.tmp/test/var/www'));
  fs.mkdirSync(path.resolve(__dirname, '../..', '.tmp/test/var/db'));
  debug('Fake environement created');
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
 * Fixture: Delete the fake environement.
 */
var after = function () {
  rimraf.sync(path.resolve(__dirname, '../..', '.tmp'));
  debug('Fake environement deleted');
};

var registerAfter = function () {
  fs.unlinkSync(untilde('@/.tmp/test/bin/run0.cmd'));
  fs.unlinkSync(untilde('@/.tmp/test/bin/run1.cmd'));
  fs.unlinkSync(untilde('@/.tmp/test/bin/run2.cmd'));
};

module.exports.before        = before;
module.exports.extractBefore = extractBefore;
module.exports.after         = after;
module.exports.registerAfter         = registerAfter;
