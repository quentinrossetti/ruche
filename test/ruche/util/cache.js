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
 * Unit tests for ruche:util:cache
 */
describe('ruche:util:cache', function () {

  before(function () { fixture.env.before(); });
  after(function () { fixture.env.after(); });

  it('should get an error when no json is present', function (done) {
    u.cache.json('acme', function (err, cache) {
      /*jshint unused:false */
      expect(err.code).to.eql(210);
      done();
    });
  });

  it('should get an error when json is invalid', function (done) {
    fixture.u.cache.createCorruptCache();
    fixture.u.cache.protectFromStaleCache();
    u.cache.json('acme', function (err, cache) {
      /*jshint unused:false */
      expect(err.code).to.eql(211);
      fixture.u.cache.exposeFromStaleCache();
      done();
    });
  });

  it('should delete cache when invalid', function (done) {
    fixture.u.cache.createCorruptCache();
    fixture.u.cache.protectFromStaleCache();
    u.cache.json('acme', function (err, cache) {
      /*jshint unused:false */
      fixture.u.cache.exposeFromStaleCache();
      done();
    });
  });
  var exists = fs.existsSync(path.resolve(process.rc.dir.tmp, 'acme.json'));
  expect(exists).to.eql(false);

  it('should get an error when json file is expired', function (done) {
    fixture.u.cache.createCache();
    u.cache.json('acme', function (err, cache) {
      /*jshint unused:false */
      expect(err.code).to.eql(220);
      done();
    });
  });

  it('should get data when json is present and valid', function (done) {
    fixture.u.cache.createCache();
    fixture.u.cache.protectFromStaleCache();
    u.cache.json('acme', function (err, cache) {
      /*jshint unused:false */
      expect(cache[0]).to.have.property('name');
      expect(cache[0]).to.have.property('version');
      expect(cache[0]).to.have.property('platform');
      fixture.u.cache.exposeFromStaleCache();
      fixture.u.cache.removeJson();
      done();
    });
  });

  it('should get an error when no archive is present', function (done) {
    process.tasks[0] = fixture.u.cache.createTask();
    u.cache.archive(0, function (err, cache) {
      /*jshint unused:false */
      expect(err.code).to.eql(210);
      done();
    });
  });

  it('should get a path when archive is present', function (done) {
    process.tasks[0] = fixture.u.cache.createTask();
    fixture.u.cache.createArchive();
    u.cache.archive(0, function (err, cache) {
      expect(cache).to.be.a('string');
      done();
    });
  });

});
