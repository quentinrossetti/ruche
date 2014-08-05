/* global describe, it, before, after, beforeEach */
'use strict';
var chai    = require('chai');
var fixture = require('../../fixture');
var u       = require('../../../lib/ruche/util');

// Initialization and configuration
var expect = chai.expect;

/*
 * Unit tests for ruche:util:get
 */
describe('ruche:util:get', function () {

  before(function (done) {
    fixture.env.before();
    fixture.server.serve(function () {
      done();
    });
  });
  after(function () { fixture.env.after(); });
  beforeEach(function () { fixture.env.beforeEach(); });

  it('should get an error on unknown package', function (done) {
    u.get.json('???', function (err, cache) {
      expect(err.code).to.eql(230);
      done();
    });
  });

  it('should get an error when can\'t reach repository', function (done) {
    fixture.u.get.corruptRepository();
    u.get.json('acme', function (err, cache) {
      expect(err.code).to.eql(110);
      fixture.u.get.restoreRepository();
      done();
    });
  });

  it('should get an error server send an error', function (done) {
    u.get.json('error', function (err, cache) {
      expect(err.code).to.eql(110);
      done();
    });
  });

  it('should get an error when invalid JSON', function (done) {
    u.get.json('acmeCorrupt', function (err, cache) {
      expect(err.code).to.eql(211);
      done();
    });
  });

  it('should get an error when can\'t save ruche.json', function (done) {
    fixture.u.get.removeTmpDir();
    u.get.json('acme', function (err, cache) {
      expect(err.code).to.eql(212);
      fixture.u.get.restoreTmpDir();
      done();
    });
  });

  it('should get the cache json when available', function (done) {
    u.get.json('acme', function (err, cache) {
      expect(err).to.eql(null);
      expect(cache).to.be.an('array');
      done();
    });
  });

  it('should also work with custom repositories', function (done) {
    fixture.u.get.alterRepository();
    u.get.json('acme', function (err, cache) {
      expect(err).to.eql(null);
      expect(cache).to.be.an('array');
      fixture.u.get.restoreRepository();
      done();
    });
  });

  it('should get an error on error task link', function (done) {
    process.tasks[0] = fixture.u.get.createTask();
    fixture.u.get.corruptTaskLink();
    u.get.archive(0, function (err, filePath) {
      expect(err.code).to.eql(110);
      done();
    });
  });

  it('should get an error on not found task link', function (done) {
    process.tasks[0] = fixture.u.get.createTask();
    process.tasks[0].match.link += '/404';
    u.get.archive(0, function (err, filePath) {
      expect(err.code).to.eql(111);
      done();
    });
  });

  it('should emit `dl-start`', function (done) {
    var called = false;
    process.tasks[0] = fixture.u.get.createTask();
    u.event.on('dl-start', function (task_index, length) {
      u.event.removeAllListeners();
      called = true;
    });
    u.get.archive(0, function (err, filePath) {
      expect(called).to.eql(true);
      done();
    });
  });

  it('should emit `dl-data`', function (done) {
    var called = false;
    process.tasks[0] = fixture.u.get.createTask();
    u.event.on('dl-data', function (task_index, chunk_length) {
      u.event.removeAllListeners();
      called = true;
    });
    u.get.archive(0, function (err, filePath) {
      expect(called).to.eql(true);
      done();
    });
  });

  it('should emit `dl-end`', function (done) {
    var called = false;
    process.tasks[0] = fixture.u.get.createTask();
    u.event.on('dl-end', function (task_index) {
      u.event.removeAllListeners();
      called = true;
    });
    u.get.archive(0, function (err, filePath) {
      expect(called).to.eql(true);
      done();
    });
  });

});
