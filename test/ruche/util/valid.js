// Module dependencies
/* global describe, it, before, after, beforeEach, afterEach */
'use strict';
var debug   = require('debug')('ruche:test:ruche:util');
var chai    = require('chai');
var path    = require('path');
var valid   = require('../../../lib/ruche/util/valid');

// Initialization and configuration
var expect = chai.expect;

/**
 * Test suite for ruche:util:valid
 */
describe('ruche:util:valid', function () {

  before(function () {
    debug('Test suite for ruche:util:valid started');

  });
  after(function () {
    debug('Test suite for ruche:util:valid ended');
  });

  it('should returns an object with `global` key', function () {
    var r = valid();
    expect(r).to.contain.keys('global');
  });

  it('options should be an array', function () {
    var r = valid();
    expect(r.global).to.be.instanceOf(Array);
  });

});
