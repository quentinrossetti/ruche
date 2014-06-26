// Module dependencies
/* global describe, it, before, after, beforeEach, afterEach */
'use strict';
var debug   = require('debug')('ruche:test:cli:help');
var chai    = require('chai');
var cli     = require('../../lib/cli');
var fixture = require('../fixture');
var emitter = require('../../lib/ruche/util/emitter');

// Initialization and configuration
var expect = chai.expect;
var stdout = process.stdout;

/**
 * Test suite for cli:index
 */
describe('cli:index', function () {

  before(function () {
    debug('Test suite for cli:index started');
    fixture.env.before();
    emitter.removeAllListeners();
  });
  after(function () {
    emitter.removeAllListeners();
    fixture.env.after();
    debug('Test suite for cli:index ended');
  });



});
