/* global describe, it, before, after */
'use strict';
var _       = require('underscore');
var chai    = require('chai');
var fs      = require('fs');
var path    = require('path');
var fixture = require('../fixture');
var u       = require('../../lib/ruche/util');

// Initialization and configuration
var expect = chai.expect;

/*
 * Unit tests for ruche:util:match
 */
describe('ruche:util:match', function () {

  before(function () { fixture.env.before(); });
  after(function () { fixture.env.after(); });

  it('should callback an error when no cache is not present', function (done) {
    u.match.cache('acme', function (err, cache) {
      /*jshint unused:false */
      expect(err.code).to.eql(210);
      done();
    });
  });

  it('should callback an error when cache is invalid', function (done) {
    fixture.u.match.createCorruptCache();
    fixture.u.match.protectFromStaleCache();
    u.match.cache('acme', function (err, cache) {
      /*jshint unused:false */
      expect(err.code).to.eql(211);
      fixture.u.match.exposeFromStaleCache();
      done();
    });
  });

  it('should delete cache when invalid', function (done) {
    fixture.u.match.createCorruptCache();
    fixture.u.match.protectFromStaleCache();
    u.match.cache('acme', function (err, cache) {
      /*jshint unused:false */
      var exists = fs.existsSync(path.resolve(process.rc.dir.tmp, 'acme.json'));
      expect(exists).to.eql(false);
      fixture.u.match.exposeFromStaleCache();
      done();
    });
  });

  it('should callback data when cache is present', function (done) {
    fixture.u.match.createCache();
    fixture.u.match.protectFromStaleCache();
    u.match.cache('acme', function (err, cache) {
      /*jshint unused:false */
      expect(cache[0]).to.have.property('name');
      expect(cache[0]).to.have.property('version');
      expect(cache[0]).to.have.property('platform');
      fixture.u.match.exposeFromStaleCache();
      done();
    });
  });

  it('should callback an error when cache is expired', function (done) {
    fixture.u.match.createCache();
    u.match.cache('acme', function (err, cache) {
      /*jshint unused:false */
      expect(err.code).to.eql(220);
      done();
    });
  });

  it('should get a valid platform', function () {
    var r = u.match.platform();
    expect(r).to.match(/^[a-z]+\d+$/);
  });

  it('should fallback to `linux32` on unknown platform', function () {
    fixture.u.match.defaultProcessPlatform();
    var r = u.match.platform();
    fixture.u.match.restoreProcessPlatform();
    expect(r).to.eql('linux32');
  });

  it('should match the last version on this platform', function () {
    fixture.u.match.defaultProcessPlatform();
    var cache = fixture.u.match.getCacheStandard();
    var query = { name: 'acme' };
    var r = u.match.find(query, cache);
    fixture.u.match.restoreProcessPlatform();
    expect(r.length).to.eql(_.where(cache, {
      platform: 'linux32',
      options: undefined
    }).length);
  });

  it('should match the specified version', function () {
    fixture.u.match.defaultProcessPlatform();
    var cache = fixture.u.match.getCacheStandard();
    var query = { name: 'acme', version: '0.0.1' };
    var r = u.match.find(query, cache);
    fixture.u.match.restoreProcessPlatform();
    expect(r.length).to.eql(_.where(cache, {
      platform: 'linux32',
      options: undefined,
      version: '0.0.1'
    }).length);
  });

  it('should throw an error when no match', function () {
    fixture.u.match.defaultProcessPlatform();
    var cache = fixture.u.match.getCacheStandard();
    var query = { name: 'acme', version: '???' };
    try {
      u.match.find(query, cache);
      fixture.u.match.restoreProcessPlatform();
    } catch (err) {
      expect(err.code).to.eql(230);
    }
  });

});
