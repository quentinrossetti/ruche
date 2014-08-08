/* global describe, it, before, after */
'use strict';
var chai    = require('chai');
var fixture = require('../fixture');
var ruche   = require('../../lib/ruche');

// Initialization and configuration
var expect = chai.expect;

/**
 * Unit tests for ruche:install
 */
describe('ruche:install', function () {

  before(function (done) {
    fixture.env.before();
    fixture.server.serve(function () {
      done();
    });
  });
  after(function () { fixture.env.after(); });

  it('should get an error unknown software', function (done) {
    ruche.install([ '???' ], function (err) {
      expect(err.code).to.be.above(100);
      done();
    });
  });

  it('should fail on invalid wish', function (done) {
    process.platform = 'linux32';
    ruche.install(['acme-57-linux32'], function (err) {
      expect(err.code).to.eql(230);
      done();
    });
  });

  it('should complete the installation', function (done) {
    process.platform = 'linux32';
    ruche.install(['acme'], function (err) {
      expect(err).to.eql(null);
      done();
    });
  });

  //TODO: Install a specific version
  //TODO: Test with multiple wishes

});
