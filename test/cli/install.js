// Module dependencies
var debug = require('debug')('ruche:test:cli:install');
var expect = require('chai').expect;
var cli = require('../../lib/cli');
var fake = require('./util/fake');

/**
 * Test suite for cli:install
 *
 * Compare the results of `cli.argv(command)` against expected scenarios. 
 */
describe('cli:install', function() {
  
  it('install package should produce `install` context', function() {
    var argv = fake.argv('ruche install package');
    var result = cli.argv(argv);
    expect(result.context).to.equal('install');
  });

  it('With no package should produce `install` help', function() {
    var argv = fake.argv('ruche install');
    var result = cli.argv(argv);
    expect(result.context).to.equal('help');
    expect(result.help).to.equal('install');
  });
  
});