// Module dependencies
/* global describe, it, before, after, beforeEach, afterEach */
'use strict';
var debug   = require('debug')('ruche:test:ruche:util');
var chai    = require('chai');
var path    = require('path');
var untilde = require('../../../lib/ruche/util/untilde');

// Initialization and configuration
var expect = chai.expect;

/**
 * Test suite for ruche:util:untilde
 */
describe('ruche:util:untilde', function () {

  before(function () {
    debug('Test suite for ruche:util:untilde started');

  });
  after(function () {
    debug('Test suite for ruche:util:untilde ended');
  });

  it('~ should returns the user home', function () {
    var r = untilde('~');
    var home = process.env.HOME || process.env.USERPROFILE;
    expect(r).to.eql(home);
  });

  it('@ should returns the install folder', function () {
    var r = untilde('@');
    expect(r).to.eql(path.resolve(__dirname, '../../..'));
  });

  it('should act like path.resolve()', function () {
    var r = '../../fixture';
    expect(untilde(r)).to.eql(path.resolve(r));
  });

});
