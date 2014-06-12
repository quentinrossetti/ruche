// Module dependencies
var debug = require('debug')('ruche:test:fixture:stdout');
var fixtureSdtout = require('fixture-stdout');
var stdoutFixture = new fixtureSdtout();

/**
 * Fixture: A test fixture to intercept writes to stdout.
 */
var before = function (data) {
  stdoutFixture.capture(function (string, encoding, fd) {
    data.push({
      string: string,
      encoding: encoding,
      fd: fd,
    });
    return false;
  });
};

/**
 * Fixture-end: Go back to the original version of stdout
 */
var after = function () {
  stdoutFixture.release();
};

module.exports.before = before;
module.exports.after = after;