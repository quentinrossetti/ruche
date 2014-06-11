// Module dependencies
var debug = require('debug')('ruche:test:cli:uninstall');
var expect = require('chai').expect;
var cli = require('../../lib/cli/argv');
var fake = require('../util/fake');

/**
 * Test suite for cli:uninstall
 *
 * Compare the results of `cli.argv(command)` against expected scenarios. 
 */
describe('cli:uninstall', function() {

  before(function () { fake.rcBefore(); });
  after(function () { fake.rcAfter(); });
  
  it('uninstall package should produce `uninstall` context', function() {
    var argv = fake.argv('ruche uninstall package');
    var result = cli(argv);
    expect(result.context).to.equal('uninstall');
  });

  it('With no package should produce `uninstall` help', function() {
    var argv = fake.argv('ruche uninstall');
    var result = cli(argv);
    expect(result.context).to.equal('help');
    expect(result.help).to.equal('uninstall');
  });
  
});