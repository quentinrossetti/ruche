// Module dependencies
var debug    = require('debug')('ruche:test:cli:version');
var chai     = require('chai');
var path     = require('path');
var fs       = require('fs');
var version  = require('../../lib/cli/version');
var fixtures = require('../fixtures');

// Initialization and configuration
var expect = chai.expect;

/**
 * Test suite for cli:version
 *
 * Compare the results of `cli.argv(command)` against expected scenarios.
 */
describe('cli:version', function() {
   
  before(function () {
    fixtures.rc.before();
  });
  after(function () {
    fixtures.rc.after();
  });
  
  it('--version should produce `version` context', function() {
    
  });

  it('-V should produce `version` context', function() {
    
  });

  it('should print a valid version to stdout', function(done) {
    var capture = [];
    fixtures.stdout.before(capture);
    version(function(data) {
      fixtures.stdout.after();
      expect(capture[0].string).to.match(/^v\d+.\d+.\d+\n$/);
      done();
    });  
  });
  
});