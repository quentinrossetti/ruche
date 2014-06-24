// Module dependencies
/* global describe, it, before, after, beforeEach, afterEach */
'use strict';
var debug   = require('debug')('ruche:test:cli:version');
var chai    = require('chai');
var cli     = require('../../lib/cli');
var fixture = require('../fixture');

// Initialization and configuration
var expect = chai.expect;

/**
 * Test suite for cli:version
 */
describe('cli:version', function () {

  before(function () {
    fixture.env.before();
    debug('Test suite for cli:version started');
  });
  after(function () {
    fixture.env.after();
    debug('Test suite for cli:version ended');
  });

  // it('should print a valid version to stdout', function(done) {
  //   var capture = [];
  //   fixture.stdout.before(capture);
  //   /*jshint unused:false */
  //   cli.version(function(data) {
  //     fixture.stdout.after();
  //     expect(capture[0]).to.match(/^v\d+.\d+.\d+\n$/);
  //     done();
  //   });
  // });

  // it('should send a error when unreachable package.json', function (done) {
  //   var capture = [];
  //   fixture.stdout.before(capture);
  //   fixture.error.packageUnreachableBefore();
  //   /*jshint unused:false */
  //   cli.version(function(data) {
  //     fixture.error.packageAfter();
  //     fixture.stdout.after();
  //     expect(capture[0]).to.have.string('Error:');
  //     done();
  //   });
  // });

});
