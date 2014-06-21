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
  package: 'fixpack',
  version: '0.0.2',
  platform: 'win32',
  bin: {
    run0: 'run0.cmd',
    run1: 'run1.cmd',
    run2: 'run2.cmd'
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
  beforeEach(function () {
    fixture.env.removeBefore();
  });

  it('should remove binaries', function (done) {
    remove(match, 0, function () {
      var r = fs.readdirSync(untilde('@/.tmp/test/bin'));
      expect(r).to.eql([]);
      done();
    });
  });

  it('should ignore remove binaries when there is none', function (done) {
    var match = {
      package: 'fixpack',
      version: '0.0.2',
      platform: 'win32'
    };
    remove(match, 0, function () {
      var r = fs.readdirSync(untilde('@/.tmp/test/bin'));
      expect(r.length).to.eql(3);
      done();
    });
  });

  it('should remove `share/fixpack` when only one version', function (done) {
    remove(match, 0, function () {
      var r = fs.readdirSync(untilde('@/.tmp/test/share'));
      expect(r.length).to.eql(0);
      done();
    });
  });

  it('should remove `etc/fixpack` folder', function (done) {
    remove(match, 0, function () {
      var r = fs.existsSync(untilde('@/.tmp/test/etc/fixpack'));
      expect(r).to.eql(false);
      done();
    });
  });

  it('should rm `fixpack-0.0.1-win32` only when more version', function (done) {
    fs.mkdirSync(untilde('@/.tmp/test/share/fixpack/fixpack-0.0.3-win32'));
    remove(match, 0, function () {
      var r = fs.readdirSync(untilde('@/.tmp/test/share/fixpack'));
      expect(r.length).to.eql(1);
      rimraf.sync(untilde('@/.tmp/test/share/fixpack/fixpack-0.0.3-win32'));
      rimraf.sync(untilde('@/.tmp/test/share/fixpack'));
      done();
    });
  });

  it('should ignore remove `etc` when there is none', function (done) {
    rimraf.sync(untilde('@/.tmp/test/etc/fixpack'));
    remove(match, 0, function () {
      var r = fs.readdirSync(untilde('@/.tmp/test/etc'));
      expect(r.length).to.eql(0);
      done();
    });
  });

});
