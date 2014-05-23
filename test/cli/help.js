// Module dependencies
var debug = require('debug')('ruche:test:cli:help');
var expect = require('chai').expect;
var cli = require('../../lib/cli');
var fake = require('./fake');

// Test suite
describe('cli:help', function() {
  
  it('An -h option should produce an `help` context', function() {
    var argv = fake.argv('-h');
    expect(cli.argv(argv).context).to.equal('help');
  });
  it('An --help option should produce an `help` context', function() {
    var argv = fake.argv('--help');;
    expect(cli.argv(argv).context).to.equal('help');
  });
  it('With no command specified `help` should be set to `global`', function() {
    var argv = fake.argv('--help');
    expect(cli.argv(argv).help).to.equal('global');
  });
  it('With an unknown command `help` is set to `global`', function() {
    var argv = fake.argv('makemecoffee');
    expect(cli.argv(argv).help).to.equal('global');
  });
  it('With an known command `help` is set to `command`', function() {
    var argv = fake.argv('install -h');
    expect(cli.argv(argv).help).to.equal('install');
  });

});