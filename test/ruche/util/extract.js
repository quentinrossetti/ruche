// Module dependencies
/* global describe, it, before, after, beforeEach, afterEach */
'use strict';
var debug   = require('debug')('ruche:test:ruche:util');
var fs      = require('fs');
var chai    = require('chai');
var extract = require('../../../lib/ruche/util/extract');
var fixture = require('../../fixture');

// Initialization and configuration
var expect = chai.expect;

/**
 * Test suite for ruche:util:extract
 */
describe('ruche:util:extract', function () {

  before(function () {
    debug('Test suite for ruche:util:extract started');
    fixture.env.before();
    fixture.env.extractBefore('fixpack-0.0.1-win32');
  });
  after(function () {
    fixture.env.after();
    debug('Test suite for ruche:util:extract ended');
  });

  it('should properly extract into `share`', function (done) {
    var match = {
      package: 'fixpack',
      version: '0.0.1',
      platform: 'win32'
    };
    /*jshint unused:false */
    extract(match, 0, function (err, location) {
      var r = fs.readdirSync('.tmp/test/share/fixpack');
      if (r[0] === 'fixpack-0.0.1-win32') {
        done();
      }
    });
  });

  it('should send an error when invalid archive', function (done) {
    var match = {
      package: 'fixpack',
      version: '0.0.1broken',
      platform: 'win32'
    };
    /*jshint unused:false */
    extract(match, 0, function (err, location) {
      if (err.message === 'No downloaded package to extract') {
        done();
      }
    });
  });

});
