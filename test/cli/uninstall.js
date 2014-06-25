// Module dependencies
/* global describe, it, before, after, beforeEach, afterEach */
'use strict';
var debug   = require('debug')('ruche:test:cli');
var chai    = require('chai');
var ruche   = require('../../lib/ruche');
var cli     = require('../../lib/cli');
var util    = require('../../lib/cli/util');
var fixture = require('../fixture');
var emitter = require('../../lib/ruche/util/emitter');

// Initialization and configuration
var expect = chai.expect;
var stdout = process.stdout;

/**
 * Test suite for cli:uninstall
 */
describe('cli:uninstall', function () {

  before(function () {
    debug('Test suite for cli:uninstall started');
    fixture.env.before();
    fixture.server.before();
    emitter.removeAllListeners();
  });
  after(function () {
    emitter.removeAllListeners();
    fixture.env.after();
    debug('Test suite for cli:uninstall ended');
  });

  it('should print a valid uninstall to stdout', function(done) {
    var capture = [];
    var test = util.argv(fixture.argv('ruche uninstall fixpack'));
    stdout.hook('write', function(string, encoding, fd, write) {
        capture.push(string);
    }, true);
    /*jshint unused:false */
    ruche.install(['fixpack'], function (err, data) {
      cli.uninstall(test, function(data) {
        stdout.unhook('write');
        expect(capture[0]).to.contain('Uninstallation');
        expect(capture[1]).to.contain('done!');
        done();
      });
    });
  });

  it('should print a error when unknown package', function(done) {
    var capture = [];
    var test = util.argv(fixture.argv('ruche uninstall unknown'));
    stdout.hook('write', function(string, encoding, fd, write) {
        capture.push(string);
    }, true);
    /*jshint unused:false */
    cli.uninstall(test, function(data) {
      stdout.unhook('write');
      expect(capture[0]).to.contain('Error');;
      done();
    });
  });
});
