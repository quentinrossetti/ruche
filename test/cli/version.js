// Module dependencies
var debug = require('debug')('ruche:test:cli:version');
var path = require('path');
var fs = require('fs');
var expect = require('chai').expect;
var cli = require('../../lib/cli/argv');
var fake = require('../util/fake');

/**
 * Test suite for cli:version
 *
 * Compare the results of `cli.argv(command)` against expected scenarios. 
 */
describe('cli:version', function() {

  before(function () { fake.rcBefore(); });
  after(function () { fake.rcAfter(); });
  
  it('--version should produce `version` context', function() {
    var argv = fake.argv('ruche --version');
    var result = cli(argv);
    expect(result.context).to.equal('version');
  });

  it('-V should produce `version` context', function() {
    var argv = fake.argv('ruche -V');
    var result = cli(argv);
    expect(result.context).to.equal('version');
  });
  
});