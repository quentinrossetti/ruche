// Module dependencies
/* global describe, it, before, after, beforeEach, afterEach */
'use strict';
var debug   = require('debug')('ruche:test:cli');
var chai    = require('chai');
var cli     = require('../../lib/cli');
var fixture = require('../fixture');

// Initialization and configuration
var expect = chai.expect;

/**
 * Test suite for cli:alternatives
 */
describe('cli:alternatives', function () {

  before(function () {
    debug('Test suite for cli:alternatives started');
    fixture.env.before();
  });
  after(function () {
    fixture.env.after();
    debug('Test suite for cli:alternatives ended');
  });

  it('should print alternatives to stdout', function (done) {
    var capture = [];
    fixture.stdout.before(capture);
    /*jshint unused:false */
    cli.alternatives('curl', function (data) {
      fixture.stdout.after();
      expect(capture[0].split('\n').length).to.be.at.least(5);
      done();
    });
  });

  // it('should send a error when unreachable help file', function (done) {
  //   var capture = [];
  //   fixture.stdout.before(capture);
  //   fixture.error.helpUnreachableBefore();
  //   /*jshint unused:false */
  //   cli.help('global', function(data) {
  //     fixture.error.helpAfter();
  //     fixture.stdout.after();
  //     expect(capture[0]).to.have.string('Error:');
  //     done();
  //   });
  // });

});
