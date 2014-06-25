// Module dependencies
/* global describe, it, before, after, beforeEach, afterEach */
'use strict';
var debug   = require('debug')('ruche:test:cli');
var chai    = require('chai');
var cli     = require('../../lib/cli');
var util    = require('../../lib/cli/util');
var fixture = require('../fixture');
var emitter = require('../../lib/ruche/util/emitter');

// Initialization and configuration
var expect = chai.expect;
var stdout = process.stdout;

/**
 * Test suite for cli:install
 */
describe('cli:install', function () {

  before(function () {
    debug('Test suite for cli:install started');
    fixture.env.before();
    fixture.server.before();
    emitter.removeAllListeners();
  });
  after(function () {
    emitter.removeAllListeners();
    fixture.env.after();
    debug('Test suite for cli:install ended');
  });

  it('should print a valid install to stdout', function(done) {
    var capture = [];
    var test = util.argv(fixture.argv('ruche install fixpack'));
    stdout.hook('write', function(string, encoding, fd, write) {
        capture.push(string);
    }, true);
    /*jshint unused:false */
    cli.install(test, function(data) {
      stdout.unhook('write');
      expect(capture[0]).to.contain('Downloading');
      expect(capture[1]).to.contain('Extracting');
      expect(capture[2]).to.contain('Registering');
      expect(capture[3]).to.contain('done!');
      done();
    });
  });

  it('should print a error when unknown package', function(done) {
    var capture = [];
    var test = util.argv(fixture.argv('ruche install unknown'));
    stdout.hook('write', function(string, encoding, fd, write) {
        capture.push(string);
    }, true);
    /*jshint unused:false */
    cli.install(test, function(data) {
      stdout.unhook('write');
      expect(capture[0]).to.contain('Error');;
      done();
    });
  });

});
