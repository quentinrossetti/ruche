// Module dependencies
var debug   = require('debug')('ruche:test:ruche:help');
var chai    = require('chai');
var path    = require('path');
var fs      = require('fs');
var ruche   = require('../../lib/ruche');
var fixture = require('../fixture');

// Initialization and configuration
var expect = chai.expect;

/**
 * Test suite for ruche:help
 */
describe('ruche:help', function () {

  before(function () {
    fixture.rc.before();
  });
  after(function () {
    fixture.rc.after();
  });

  it('should send a valid help', function (done) {
    ruche.help(function(err, data) {
      expect(data.split('\n').length).to.be.at.least(5);
      done();
    });
  });

  it('should send a list of commands and options', function (done) {
    ruche.help(function(err, data) {
      expect(data.split('\n')).to.contain('Commands:');
      expect(data.split('\n')).to.contain('Options:');
      done();
    });
  });

  it('should send the appropriate context help', function (done) {
    ruche.help('install', function(err, data) {
      expect(data.split('\n')[0].split(' ')).to.contain('install');
      done();
    });
  });

  it('should send a error when unreachable help', function (done) {
    fixture.error.helpUnreachableBefore();
    ruche.help(function(err, data) {
      expect(err.message).to.equal('Can\'t read the help file');
      fixture.error.helpAfter();
      done();
    });
  });

});