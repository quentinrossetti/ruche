// Module dependencies
/* global describe, it, before, after, beforeEach, afterEach */
'use strict';
var debug   = require('debug')('ruche:test:ruche');
var chai    = require('chai');
var rimraf  = require('rimraf');
var fs      = require('fs');
var ruche   = require('../../lib/ruche');
var emitter = require('../../lib/ruche/util/emitter');
var untilde = require('../../lib/ruche/util/untilde');
var fixture = require('../fixture');

// Initialization and configuration
var expect = chai.expect;

/**
 * Test suite for ruche:alternatives
 */
describe('ruche:alternatives', function () {

  before(function () {
    debug('Test suite for ruche:alternatives started');
    fixture.env.before();
    fixture.server.before();
  });
  after(function () {
    fixture.env.after();
    debug('Test suite for ruche:alternatives ended');
  });

  it('should send a list of local alternative', function (done) {
    ruche.install(['fixpack-0.0.1-win32', 'fixpack'], function (err, data) {
      ruche.alternatives('fixpack', function (err, data) {
        expect(data.length).to.eql(2);
        done();
      });
    });
  });

  it('should change the version', function (done) {
    emitter.removeAllListeners();
    ruche.alternatives('fixpack-0.0.1-win32', function (err, data) {
      expect(data.length).to.eql(2);
      done();
    });
  });

  it('should send error when invalid package', function (done) {
    emitter.removeAllListeners();
    ruche.alternatives('fixpack-0.0.4-win32', function (err, data) {
      if (err) {
        done();
      }
    });
  });

  it('should send error when share is not readable', function (done) {
    emitter.removeAllListeners();
    var share = untilde('@/.tmp/test/share/fixpack');
    rimraf.sync(share);
    ruche.alternatives('fixpack-0.0.1-win32', function (err, data) {
      if (err) {
        done();
      }
    });
  });

});
