// Module dependencies
var debug = require('debug')('ruche:test:cli:help');
var expect = require('chai').expect;
var cli = require('../../lib/cli');
var fake = require('./fake');

/**
 * Test suite for cli:help
 *
 * Compare the results of `cli.argv(command)` against expected scenarios. 
 */
describe('cli:help', function() {
  
  it('--help should produce `help` context', function() {
    var argv = fake.argv('ruche --help');;
    expect(cli.argv(argv).context).to.equal('help');
  });

  it('-h should produce `help` context', function() {
    var argv = fake.argv('ruche -h');
    expect(cli.argv(argv).context).to.equal('help');
  });
  
  it('No command should produce `help` context and `global` help', function() {
    var argv = fake.argv('ruche');
    expect(cli.argv(argv).context).to.equal('help');
    expect(cli.argv(argv).help).to.equal('global');
  });

  it('Unknown command should produce `help` context and `global` help', function() {
    var argv = fake.argv('ruche makemecoffee');
    expect(cli.argv(argv).context).to.equal('help');
    expect(cli.argv(argv).help).to.equal('global');
  });

  it('Known command should produce `command` according to the command', function() {
    var argv = fake.argv('ruche install -h');
    expect(cli.argv(argv).context).to.equal('help');
    expect(cli.argv(argv).help).to.equal('install');
  });

});