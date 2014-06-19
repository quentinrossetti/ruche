// Module dependencies
/* global describe, it, before, after, beforeEach, afterEach */
'use strict';
var debug   = require('debug')('ruche:test:ruche:util');
var chai    = require('chai');
var emitter = require('../../../lib/ruche/util/emitter');

// Initialization and configuration
var expect = chai.expect;

/**
 * Test suite for ruche:util:emitter
 */
describe('ruche:util:emitter', function () {

  before(function () {
    debug('Test suite for ruche:util:emitter started');
  });
  after(function () {
    debug('Test suite for ruche:util:emitter ended');
  });

  it('should have a `on` method', function () {
    emitter();
    expect(emitter).to.have.property('on');
  });

  it('should have a `emit` method', function () {
    emitter();
    expect(emitter).to.have.property('emit');
  });

});
