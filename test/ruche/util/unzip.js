/* global describe, it, before, after */
'use strict';
var chai    = require('chai');
var fs      = require('fs');
var path    = require('path');
var fixture = require('../../fixture');
var u       = require('../../../lib/ruche/util');

// Initialization and configuration
var expect = chai.expect;

/*
 * Unit tests for ruche:util:unzip
 */
describe('ruche:util:unzip', function () {

  before(function () { fixture.env.before(); });
  after(function () { fixture.env.after(); });

  it('should extract to the right path', function (done) {
    done();
  });

});
