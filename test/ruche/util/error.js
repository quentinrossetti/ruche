// Module dependencies
/* global describe, it, before, after, beforeEach, afterEach */
'use strict';
var debug   = require('debug')('ruche:test:ruche:util');
var chai    = require('chai');
var error   = require('../../../lib/ruche/util/error');
var emitter = require('../../../lib/ruche/util/emitter');

// Initialization and configuration
var expect = chai.expect;

/**
 * Test suite for ruche:util:download
 */
describe('ruche:util:error', function () {

  before(function () {
    debug('Test suite for ruche:util:error started');
  });
  after(function () {
    debug('Test suite for ruche:util:error ended');
  });

  it('should be tested', function() {
    error();
    emitter.emit('error', new Error('Hello'));
    emitter.on('error', function (err) {
      expect(err.message).to.eql('Hello');
    });
  });

});
