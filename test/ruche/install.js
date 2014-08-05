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
    ruche.install([ '???' ], function (err, tasks) {
      expect(err.code).to.be.above(100);
      done();
    });
  });

//  it('should get a list of tasks', function (done) {
//    ruche.install([ 'acme', 'curl' ], function (err, tasks) {
//      done();
//    });
//  });

});
