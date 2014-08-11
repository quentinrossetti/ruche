/* global describe, it, before, after */
'use strict';
var chai    = require('chai');
var fixture = require('../fixture');
var ruche   = require('../../lib/ruche');

// Initialization and configuration
var expect = chai.expect;

/**
 * Unit tests for ruche:update
 */
describe('ruche:update', function () {

  before(function () { fixture.env.before(); });
  after(function () { fixture.env.after(); });
  beforeEach(function () { fixture.env.beforeEach(); });

  it('should send an error when package is not installed', function (done) {
    process.platform = 'linux32';
    ruche.update(['acme'], function (err) {
      expect(err.code).to.be.above(100);
      done();
    });
  });

});
