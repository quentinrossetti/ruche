// Module dependencies
var debug = require('debug')('ruche:test:fixture:rc');
var path = require('path');
var fs = require('fs');
var rimraf = require('rimraf');

/**
 * **Fixture**: Fake a configuration env .tpm/test/. Must be run before
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
};

/**
 * **Fixture**: Delete the fake environement.
 */
var after = function () {
  rimraf.sync(path.resolve(__dirname, '../..', '.tmp'));
};

module.exports.before = before;
module.exports.after = after;
