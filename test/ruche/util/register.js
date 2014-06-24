// Module dependencies
/* global describe, it, before, after, beforeEach, afterEach */
'use strict';
var debug   = require('debug')('ruche:test:ruche:util');
var fs      = require('fs');
var chai    = require('chai');
var rimraf  = require('rimraf');
var fixture = require('../../fixture');
var emitter = require('../../../lib/ruche/util/emitter');

// Initialization and configuration
var expect = chai.expect;
var match = {
  package: "fixpack",
  version: "0.0.2",
  platform: "win32",
  bin: {
    run0: "run0.cmd",
    run1: "run1.cmd",
    run2: "run2.cmd"
  }
};

/**
 * Test suite for ruche:util:register
 */
describe('ruche:util:register', function () {

  before(function () {
    debug('Test suite for ruche:util:register started');
    fixture.env.before();
    fixture.env.extractBefore('fixpack-0.0.2-win32');
    // Avoid colision with the install test suite
    emitter.removeAllListeners('reg-done-0');
    emitter.removeAllListeners('reg-data-0');
    emitter.removeAllListeners('reg-done-1');
    emitter.removeAllListeners('reg-data-1');
    emitter.removeAllListeners('reg-done-2');
    emitter.removeAllListeners('reg-data-2');
  });
  after(function () {
    fixture.env.after();
    debug('Test suite for ruche:util:register ended');
  });

  it('should register to the right place', function (done) {
    var register = require('../../../lib/ruche/util/register');
    var extract  = require('../../../lib/ruche/util/extract');
    var untilde  = require('../../../lib/ruche/util/untilde');
    /*jshint unused:false */
    extract(match, 0, function (err, location) {
      register(match, 0, function (binaries) {
        fs.readdir(untilde('@/.tmp/test/bin'), function (err, data) {
          expect(data).to.contain('run0.cmd');
          expect(data).to.contain('run1.cmd');
          expect(data).to.contain('run2.cmd');
          fixture.env.registerAfter();
          done();
        });
      });
    });
  });

  it('should be ok with no binaries', function (done) {
    match = {
      package: "fixpack",
      version: "0.0.2",
      platform: "win32"
    };
    var register = require('../../../lib/ruche/util/register');
    var extract  = require('../../../lib/ruche/util/extract');
    var untilde  = require('../../../lib/ruche/util/untilde');
    /*jshint unused:false */
    extract(match, 0, function (err, location) {
      register(match, 0, function (binaries) {
        expect(binaries).to.eql(null);
        done();
      });
    });
  });

});
