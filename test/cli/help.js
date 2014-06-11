// Module dependencies
var debug = require('debug')('ruche:test:cli:help');
var expect = require('chai').expect;
var cli = require('../../lib/cli');
var fake = require('../util/fake');

/**
 * Test suite for cli:help
 *
 * Compare the results of `cli.argv(command)` against expected scenarios. 
 */
describe('cli:help', function() {

  before(function () { fake.rcBefore(); });
  after(function () { fake.rcAfter(); });
  
  it('--help should produce `help` context', function() {
    var argv = fake.argv('ruche --help');
    var result = cli(argv);
    expect(result.context).to.equal('help');
  });

  it('-h should produce `help` context', function() {
    var argv = fake.argv('ruche -h');
    var result = cli(argv);
    expect(result.context).to.equal('help');
  });
  
  it('No command should produce `help` context and `global` help', function() {
    var argv = fake.argv('ruche');
    var result = cli(argv);
    expect(result.context).to.equal('help');
    expect(result.help).to.equal('global');
  });

  it('Unknown command should produce `help` context and `global` help', function() {
    var argv = fake.argv('ruche makemecoffee');
    var result = cli(argv);
    expect(result.context).to.equal('help');
    expect(result.help).to.equal('global');
  });

  it('Known command should produce `command` according to the command', function() {
    var argv = fake.argv('ruche install -h');
    var result = cli(argv);
    expect(result.context).to.equal('help');
    expect(result.help).to.equal('install');
  });

});