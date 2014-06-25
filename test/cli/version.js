// Module dependencies
/* global describe, it, before, after, beforeEach, afterEach */
'use strict';
var debug   = require('debug')('ruche:test:cli:version');
var chai    = require('chai');
var cli     = require('../../lib/cli');
var fixture = require('../fixture');
var emitter = require('../../lib/ruche/util/emitter');

// Initialization and configuration
var expect = chai.expect;
var stdout = process.stdout;

/**
 * Test suite for cli:version
 */
describe('cli:version', function () {

  before(function () {
    fixture.env.before();
    emitter.removeAllListeners();
    debug('Test suite for cli:version started');
  });
  after(function () {
    fixture.env.after();
    emitter.removeAllListeners();
    debug('Test suite for cli:version ended');
  });

  it('should print a valid version to stdout', function(done) {
    var capture = [];
    stdout.hook('write', function(string, encoding, fd, write) {
        capture.push(string);
    }, true);
    /*jshint unused:false */
    cli.version(function(data) {
      stdout.unhook('write');
      expect(capture[0]).to.match(/^v\d+.\d+.\d+\n$/);
      done();
    });
  });

  it('should send a error when unreachable package.json', function (done) {
    var capture = [];
    stdout.hook('write', function(string, encoding, fd, write) {
        capture.push(string);
    }, true);
    fixture.error.packageUnreachableBefore();
    /*jshint unused:false */
    cli.version(function(data) {
      fixture.error.packageAfter();
      stdout.unhook('write');
      expect(capture[0]).to.have.string('Error:');
      done();
    });
  });

});
