// Module dependencies
var debug = require('debug')('ruche:test:cli:atlernatives');
var expect = require('chai').expect;
var cli = require('../../lib/cli');
var fake = require('./util/fake');

/**
 * Test suite for cli:alternatives
 *
 * Compare the results of `cli.argv(command)` against expected scenarios. 
 */
describe('cli:alternatives', function () {
  
  it('alternatives package should produce `alternatives` context', function () {
    var argv = fake.argv('ruche alternatives package');
    var result = cli.argv(argv);
    expect(result.context).to.equal('alternatives');
  });

  it('With no package should produce `alternatives` help', function () {
    var argv = fake.argv('ruche alternatives');
    var result = cli.argv(argv);
    expect(result.context).to.equal('help');
    expect(result.help).to.equal('alternatives');
  });

  it('should be called with only one package', function () {
    var argv = fake.argv('ruche alternatives pack1 pack2');
    var result = cli.argv(argv);
    expect(result.context).to.equal('help');
    expect(result.help).to.equal('alternatives');
  });

  it('could be called with --choice option', function () {
    var argv = fake.argv('ruche alternatives package --choice package-1-win32');
    var result = cli.argv(argv);
    expect(result.context).to.equal('alternatives');
    expect(result.package).to.equal('package');
    expect(result.choice).to.equal('package-1-win32');
  });
  
});