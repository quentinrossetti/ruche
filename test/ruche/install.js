// Module dependencies
/* global describe, it, before, after, beforeEach, afterEach */
'use strict';
var debug   = require('debug')('ruche:test:ruche');
var chai    = require('chai');
var fs      = require('fs');
var ruche   = require('../../lib/ruche');
var fixture = require('../fixture');

// Initialization and configuration
var expect = chai.expect;

/**
 * Test suite for ruche:install
 */
describe('ruche:install', function () {

  before(function () {
    debug('Test suite for ruche:install started');
    fixture.env.before();
    fixture.server.before();
  });
  after(function () {
    fixture.env.after();
    debug('Test suite for ruche:install ended');
  });

  it('should send a list of what packages are installed', function (done) {
    ruche.install(['fixpack-0.0.1-win32', 'fixpack'], function (err, data) {
      expect(data.length).to.eql(2);
      done();
    });
  });

  it('should send an error when unable to find package info', function (done) {
    ruche.install(['invalid'], function (err, data) {
      if (err) {
        done();
      }
    });
  });

  it('should an error when unable to find a package', function (done) {
    ruche.install(['fixpack-0.0.1-win64'], function (err, data) {
      if (err) {
        done();
      }
    });
  });

  it('should an error when unable to extract a package', function (done) {
    var emitter = require('../../lib/ruche/util/emitter');
    var untilde = require('../../lib/ruche/util/untilde');
    emitter.on('dl-done-0', function () {
      fs.unlinkSync(untilde('@/.tmp/test/tmp/fixpack-0.0.1-win32.tar.gz'));
    });
    ruche.install(['fixpack-0.0.1-win32'], function (err, data) {
      if (err) {
        emitter.removeAllListeners('dl-done-0');
        done();
      }
    });
  });

});
