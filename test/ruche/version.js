// Module dependencies
var debug   = require('debug')('ruche:test:ruche:version');
var chai    = require('chai');
var path    = require('path');
var fs      = require('fs');
var ruche   = require('../../lib/ruche');
var fixture = require('../fixture');

// Initialization and configuration
var expect = chai.expect;

/**
 * Test suite for ruche:install
 */
describe('ruche:version', function () {

  before(function () {
    fixture.rc.before();
  });
  after(function () {
    fixture.rc.after();
  });

  it('should send a valid version', function (done) {
    ruche.version(function(err, data) {
      expect(data).to.match(/^\d+.\d+.\d+$/);
      done();
    });
  });

  it('should send a error when invalid JSON', function (done) {
    fixture.error.packageInvalidBefore();
    ruche.version(function(err, data) {
      expect(err.message).to.equal('Can\'t parse the ruche package.json file');
      fixture.error.packageAfter();
      done();
    });
  });

  it('should send a error when unreachable package.json', function (done) {
    fixture.error.packageUnreachableBefore();
    ruche.version(function(err, data) {
      expect(err.message).to.equal('Can\'t read the ruche package.json file');
      fixture.error.packageAfter();
      done();
    });
  });

});