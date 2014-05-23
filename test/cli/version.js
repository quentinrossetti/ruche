// Module dependencies
var debug = require('debug')('ruche:test:cli:version');
var expect = require('chai').expect;
var cli = require('../../lib/cli');
var fake = require('./util/fake');

/**
 * Test suite for cli:version
 *
 * Compare the results of `cli.argv(command)` against expected scenarios. 
 */
describe('cli:version', function() {
  
  it('--version should produce `version` context', function() {
    var argv = fake.argv('ruche --version');;
    expect(cli.argv(argv).context).to.equal('version');
  });

  it('-v should produce `version` context', function() {
    var argv = fake.argv('ruche -v');
    expect(cli.argv(argv).context).to.equal('version');
  });
  
});