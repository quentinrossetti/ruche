// Module dependencies
var debug   = require('debug')('ruche:test:cli:version');
var chai    = require('chai');
var path    = require('path');
var fs      = require('fs');
var cli     = require('../../lib/cli');
var fixture = require('../fixture');

// Initialization and configuration
var expect = chai.expect;

/**
 * Test suite for cli:version
 *
 * Compare the results of `cli.argv(command)` against expected scenarios.
 */
describe('cli:version', function () {
   
  before(function () {
    fixture.rc.before();
  });
  after(function () {
    fixture.rc.after();
  });
  
  it('--version should produce `version` context', function() {
    var argv = cli(fixture.argv('ruche --version'));
    expect(argv.context).to.equal('version');
  });

  it('-V should produce `version` context', function() {
    var argv = cli(fixture.argv('ruche -V'));
    expect(argv.context).to.equal('version');
  });

  it('should print a valid version to stdout', function(done) {
    var capture = [];
    fixture.stdout.before(capture);
    cli.version(function(data) {
      fixture.stdout.after();
      expect(capture[0].string).to.match(/^v\d+.\d+.\d+\n$/);
      done();
    });
  });

  it('should send a error when unreachable package.json', function (done) {
    var capture = [];
    fixture.stdout.before(capture);
    fixture.error.packageUnreachableBefore();
    cli.version(function(data) {
      fixture.stdout.after();
      fixture.error.packageAfter();
      expect(capture[0].string).to.have.string('Error:');
      done();
    });
  });
  
});