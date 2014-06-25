// Module dependencies
/* global describe, it, before, after, beforeEach, afterEach */
'use strict';
var debug   = require('debug')('ruche:test:cli:help');
var chai    = require('chai');
var cli     = require('../../lib/cli');
var fixture = require('../fixture');
var emitter = require('../../lib/ruche/util/emitter');

// Initialization and configuration
var expect = chai.expect;
var stdout = process.stdout;

/**
 * Test suite for cli:help
 */
describe('cli:help', function () {

  before(function () {
    debug('Test suite for cli:help started');
    fixture.env.before();
    emitter.removeAllListeners();
  });
  after(function () {
    emitter.removeAllListeners();
    fixture.env.after();
    debug('Test suite for cli:help ended');
  });

  it('should print a valid help to stdout', function(done) {
    var capture = [];
    stdout.hook('write', function(string, encoding, fd, write) {
        capture.push(string);
    }, true);
    /*jshint unused:false */
    cli.help('global', function(data) {
      stdout.unhook('write');
      expect(capture[0].split('\n').length).to.be.at.least(5);
      done();
    });
  });

  it('should send a error when unreachable help file', function (done) {
    var capture = [];
    stdout.hook('write', function(string, encoding, fd, write) {
        capture.push(string);
    }, true);
    fixture.error.helpUnreachableBefore();
    /*jshint unused:false */
    cli.help('global', function(data) {
      fixture.error.helpAfter();
      stdout.unhook('write');
      expect(capture[0]).to.have.string('Error:');
      done();
    });
  });

});
