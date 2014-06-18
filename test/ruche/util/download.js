// Module dependencies
/* global describe, it, before, after, beforeEach, afterEach */
'use strict';
var debug   = require('debug')('ruche:test:ruche:util');
var fs      = require('fs');
var chai    = require('chai');
var fixture = require('../../fixture');

// Initialization and configuration
var expect = chai.expect;

/**
 * Test suite for ruche:util:download
 */
describe('ruche:util:download', function () {

  before(function () {
    debug('Test suite for ruche:util:download started');
    fixture.env.before();
    fixture.server.before();
  });
  after(function () {
    fixture.env.after();
    debug('Test suite for ruche:util:download ended');
  });

  it('should get an archive', function (done) {
    var download = require('../../../lib/ruche/util/download');
    var match = {
      package: 'fixpack',
      version: '0.0.1',
      platform: 'win32'
    };
    /*jshint unused:false */
    download(match, 0, function(err, location) {
      fs.stat(location, function (err, stats) {
        expect(stats.isFile()).to.be.ok;
        done();
      });
    });
  });

  it('should send an error when invalid match', function (done) {
    var download = require('../../../lib/ruche/util/download');
    var match = {
      package: 'fixpack',
      version: '0.0.1broken',
    };
    /*jshint unused:false */
    download(match, 0, function(err, location) {
      expect(err.message).to.equal('Unaccessible URI');
      done();
    });
  });

});
