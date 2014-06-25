// Module dependencies
/* global describe, it, before, after, beforeEach, afterEach */
'use strict';
var debug   = require('debug')('ruche:test:cli');
var chai    = require('chai');
var error   = require('../../lib/cli/util/error');
var fixture = require('../fixture');

// Initialization and configuration
var expect = chai.expect;
var stdout = process.stdout;

/**
 * Test suite for cli:error
 */
describe('cli:error', function () {

  before(function () {
    debug('Test suite for cli:error started');
    fixture.env.before();
  });
  after(function () {
    fixture.env.after();
    debug('Test suite for cli:error ended');
  });

  it('should return a error message', function() {
    var capture = [];
    stdout.hook('write', function(string, encoding, fd, write) {
      capture.push(string);
    }, true);
    error(new Error('test'));
    stdout.unhook('write');
    expect(capture[0]).to.have.string('Error');
  });


});
