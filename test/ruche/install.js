// Module dependencies
/* global describe, it, before, after, beforeEach, afterEach */
'use strict';
var debug   = require('debug')('ruche:test:ruche');
var chai    = require('chai');
var ruche   = require('../../lib/ruche');
var fixture = require('../fixture');

// Initialization and configuration
var expect = chai.expect;

/**
 * Test suite for ruche:install
 */
describe('ruche:install', function () {

  before(function () {
    debug('Test suite for ruche:install started');
    fixture.env.before();
    fixture.server.before();
  });
  after(function () {
    fixture.env.after();
    debug('Test suite for ruche:install ended');
  });

  it('should send a list of what packages are installed', function (done) {
    ruche.install(['fixpack-0.0.2-win32'], function (err, data) {
      expect(data.length).to.eql(1);
      console.log('TEST ');
      done();
    });
  });

  // it('should send a list of commands and options', function (done) {
  //   ruche.install(function(err, data) {
  //     expect(data.split('\n')).to.contain('Commands:');
  //     expect(data.split('\n')).to.contain('Options:');
  //     done();
  //   });
  // });

  // it('should send the global install when unknown command', function (done) {
  //   ruche.install('unknown', function(err, data) {
  //     expect(data.split('\n')).to.contain('Commands:');
  //     done();
  //   });
  // });

  // it('should send the appropriate context install', function (done) {
  //   ruche.install('install', function(err, data) {
  //     expect(data.split('\n')[0].split(' ')).to.contain('install');
  //     done();
  //   });
  // });

  // it('should send a error when unreachable install', function (done) {
  //   fixture.error.installUnreachableBefore();
  //   /*jshint unused:false */
  //   ruche.install(function(err, data) {
  //     expect(err.message).to.equal('Can\'t read the install file');
  //     fixture.error.installAfter();
  //     done();
  //   });
  // });

});
