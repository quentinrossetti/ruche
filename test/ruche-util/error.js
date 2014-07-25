/* global describe, it */
'use strict';
var chai = require('chai');
var u    = require('../../lib/ruche/util');

// Initialization and configuration
var expect = chai.expect;

/**
 * Unit tests for ruche:util:error
 */
describe('ruche:util:error', function () {

  it('should return an friendly error', function () {
    var error = u.error(210);
    expect(error).to.have.deep.property('code');
    expect(error).to.have.deep.property('message');
    expect(error).to.have.deep.property('more');
  });

  it('should have a complete error when one is passed', function() {
    var error = u.error(210, new Error('Test error'));
    expect(error).to.have.deep.property('origin.message');
    expect(error.origin.stack).to.be.an('array');
  });

  it('should send back an 100 error when unknown error', function () {
    var error = u.error('do-not-exist');
    expect(error.code).to.eql(100);
  });

});
