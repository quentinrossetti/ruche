// Module dependencies
/* global describe, it, before, after, beforeEach, afterEach */
'use strict';
var debug   = require('debug')('ruche:test:cli');
var chai    = require('chai');
var cli     = require('../../lib/cli/util/argv');
var fixture = require('../fixture');

// Initialization and configuration
var expect = chai.expect;

/**
 * Test suite for cli:argv
 */
describe('cli:argv', function () {

  before(function () {
    debug('Test suite for cli:argv started');
    fixture.env.before();
  });
  after(function () {
    fixture.env.after();
    debug('Test suite for cli:argv ended');
  });

  it('--help should produce `help` context', function() {
    var argv = cli(fixture.argv('ruche --help'));
    expect(argv.context).to.equal('help');
  });

  it('-h should produce `help` context', function() {
    var argv = cli(fixture.argv('ruche -h'));
    expect(argv.context).to.equal('help');
  });

  it('--version should produce `version` context', function() {
    var argv = cli(fixture.argv('ruche --version'));
    expect(argv.context).to.equal('version');
  });

  it('-V should produce `version` context', function() {
    var argv = cli(fixture.argv('ruche -V'));
    expect(argv.context).to.equal('version');
  });

  it('known command should produce `command` context', function() {
    var argv = cli(fixture.argv('ruche install fixpack'));
    expect(argv.context).to.equal('install');
  });

  it('command should have some packages', function() {
    var argv = cli(fixture.argv('ruche install'));
    expect(argv.context).to.equal('help');
  });

  it('alternatives with more than one packages should be helped', function() {
    var argv = cli(fixture.argv('ruche alternatives pack1 pack2'));
    expect(argv.context).to.equal('help');
    expect(argv.help).to.equal('alternatives');
  });

});
