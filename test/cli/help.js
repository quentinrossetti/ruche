// Module dependencies
/* global describe, it, before, after, beforeEach, afterEach */
'use strict';
var debug   = require('debug')('ruche:test:cli:help');
var chai    = require('chai');
var cli     = require('../../lib/cli');
var fixture = require('../fixture');

// Initialization and configuration
var expect = chai.expect;

/**
 * Test suite for cli:help
 */
describe('cli:help', function () {

  before(function () {
    debug('Test suite for cli:help started');
    fixture.env.before();
  });
  after(function () {
    fixture.env.after();
    debug('Test suite for cli:help ended');
  });

  it('--help should produce `help` context', function() {
    var argv = cli(fixture.argv('ruche --help'));
    expect(argv.context).to.equal('help');
  });

  it('-h should produce `help` context', function() {
    var argv = cli(fixture.argv('ruche -h'));
    expect(argv.context).to.equal('help');
  });

  it('should print a valid help to stdout', function(done) {
    var capture = [];
    fixture.stdout.before(capture);
    /*jshint unused:false */
    cli.help('global', function(data) {
      fixture.stdout.after();
      expect(capture[0].split('\n').length).to.be.at.least(5);
      done();
    });
  });

  it('should send a error when unreachable help file', function (done) {
    var capture = [];
    fixture.stdout.before(capture);
    fixture.error.helpUnreachableBefore();
    /*jshint unused:false */
    cli.help('global', function(data) {
      fixture.error.helpAfter();
      fixture.stdout.after();
      expect(capture[0]).to.have.string('Error:');
      done();
    });
  });

});
