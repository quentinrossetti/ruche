/* global describe, it, before, after */
'use strict';
var chai    = require('chai');
var ruche   = require('../../lib/ruche');
var fixture = require('../fixture');

// Initialization and configuration
var expect = chai.expect;

/**
 * Unit tests for ruche:install
 */
describe('ruche:install', function () {

  before(function () { fixture.env.before(); });
  after(function () { fixture.env.after(); });

});
