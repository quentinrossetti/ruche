// Module dependencies
var debug = require('debug')('ruche:test:cli:atlernatives');
var expect = require('chai').expect;
var cli = require('../../lib/cli/argv');
var fake = require('../util/fake');

/**
 * Test suite for cli:alternatives
 *
 * Compare the results of `cli.argv(command)` against expected scenarios. 
 */
describe('cli:alternatives', function () {

  before(function () { fake.rcBefore(); });
  after(function () { fake.rcAfter(); });
  
  it('alternatives package should produce `alternatives` context', function () {
    var argv = fake.argv('ruche alternatives curl');
    var result = cli(argv);
    expect(result.context).to.equal('alternatives');
  });

  it('With no package should produce `alternatives` help', function () {
    var argv = fake.argv('ruche alternatives');
    var result = cli(argv);
    expect(result.context).to.equal('help');
    expect(result.help).to.equal('alternatives');
  });

  it('should be called with only one package', function () {
    var argv = fake.argv('ruche alternatives pack1 pack2');
    var result = cli(argv);
    expect(result.context).to.equal('help');
    expect(result.help).to.equal('alternatives');
  });

  it('could be called with --choice option', function () {
    var argv = fake.argv('ruche alternatives curl --choice curl-7.37.0-win32');
    var result = cli(argv);
    expect(result.context).to.equal('alternatives');
    expect(result.package).to.equal('curl');
    expect(result.choice).to.equal('curl-7.37.0-win32');
  });
  
});