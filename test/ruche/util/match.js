// Module dependencies
/* global describe, it, before, after, beforeEach, afterEach */
'use strict';
var debug   = require('debug')('ruche:test:ruche:util');
var chai    = require('chai');
var match   = require('../../../lib/ruche/util/match');

// Initialization and configuration
var expect = chai.expect;
var data = [
  {
    package: 'fixpack',
    version: '0.10.1',
    platform: 'win32'
  },{
    package: 'fixpack',
    version: '0.8.1',
    platform: 'win32'
  },{
    package: 'fixpack',
    version: '0.9.1',
    platform: 'win32'
  },{
    package: 'fixpack',
    version: '0.9.1',
    platform: 'win64'
  },{
    package: 'fixpack',
    version: '21.9.1',
    platform: 'win32'
  }
];

/**
 * Test suite for ruche:util:match
 */
describe('ruche:util:match', function () {

  before(function () {
    debug('Test suite for ruche:util:match started');

  });
  after(function () {
    debug('Test suite for ruche:util:match ended');
  });

  it('should match the latest version', function () {
    var r = match({ package: 'fixpack' }, data);
    expect(r.version).to.eql('21.9.1');
  });

  it('should match the exact version', function () {
    var wanted = {
      package: 'fixpack',
      version: '0.8.1',
      platform: 'win32'
    };
    var r = match(wanted, data);
    expect(r.version).to.eql('0.8.1');
  });

  it('should match the latest when the 64bit is outdated', function () {
    var r = match({ package: 'fixpack' }, data);
    expect(r.version).to.eql('21.9.1');
  });

  it('should match the 64bit version when its the latest', function () {
    data.push({
      package: 'fixpack',
      version: '21.9.1',
      platform: 'win64'
    });
    var old = process.env.PROCESSOR_ARCHITECTURE;
    process.env.PROCESSOR_ARCHITECTURE = 'AMD64';
    var r = match({ package: 'fixpack' }, data);
    expect(r.version).to.eql('21.9.1');
    expect(r.platform).to.eql('win64');
    process.env.PROCESSOR_ARCHITECTURE = old;
  });

});
