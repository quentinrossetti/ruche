// Module dependencies
'use strict';
var debug = require('debug')('ruche:test:fixture');

// Initialization and configuration
var old = process.stdout.write;

/**
 * Fixture: A test fixture to intercept writes to stdout
 */
var before = function (data) {
  process.stdout.write = function (write) {
    data.push(write);
  };
  debug('A test fixture to intercept writes to stdout');
};

/**
 * Fixture-end: Go back to the original version of stdout
 */
var after = function () {
  process.stdout.write = old;
  debug('Go back to the original version of stdout');
};

module.exports.before = before;
module.exports.after = after;
