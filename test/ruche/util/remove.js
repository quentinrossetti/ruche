// Module dependencies
/* global describe, it, before, after, beforeEach, afterEach */
'use strict';
var debug   = require('debug')('ruche:test:ruche:util');
var fs      = require('fs');
var chai    = require('chai');
var rimraf  = require('rimraf');
var remove  = require('../../../lib/ruche/util/remove');
var untilde = require('../../../lib/ruche/util/untilde');
var fixture = require('../../fixture');

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
 * Test suite for ruche:util:remove
 */
describe('ruche:util:remove', function () {

  before(function () {
    debug('Test suite for ruche:util:remove started');
    fixture.env.before();
  });
  after(function () {
    fixture.env.after();
    debug('Test suite for ruche:util:remove ended');
  });

  it('should remove binaries', function (done) {
    fixture.env.removeBefore();
    remove(match, 0, function () {
      var r = fs.readdirSync(untilde('@/.tmp/test/bin'));
      expect(r).to.eql([]);
      done();
    });
  });

  it('should remove `share/package` folder', function (done) {
    fixture.env.removeBefore();
    remove(match, 0, function () {
      var r = fs.readdirSync(untilde('@/.tmp/test/share'));
      expect(r).to.eql([]);
      done();
    });
  });

  it('should remove `etc/package` folder', function (done) {
    fixture.env.removeBefore();
    remove(match, 0, function () {
      var r = fs.existsSync(untilde('@/.tmp/test/etc/fixpack'));
      expect(r).to.eql(false);
      done();
    });
  });

});
