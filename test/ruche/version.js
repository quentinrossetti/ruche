/* global describe, it, before, after */
'use strict';
var chai    = require('chai');
var ruche   = require('../../lib/ruche');
var fixture = require('../fixture');

// Initialization and configuration
var expect = chai.expect;

/**
 * Unit tests for ruche:version
 */
describe('ruche:version', function () {

  before(function () { fixture.env.before(); });
  after(function () { fixture.env.after(); });

  it('should callback valid version number', function (done) {
    var regexp = /^v\d.\d.\d$/;
    var result;
    ruche.version(function (err, version) {
      result = regexp.test(version);
      expect(result).to.eq(true);
      done();
    });
  });

  it('should callback an error if package.json is missing', function (done) {
    fixture.version.copyPackageJson();
    fixture.version.removePackageJson();
    ruche.version(function (err, version) {
      /*jshint unused:false */
      expect(err.code).to.eql(210);
      fixture.version.restorePackageJson();
      done();
    });
  });

  //TODO: should callback a 211 error when package.json file is corrupted
  it('should callback an error if package.json is corrupted', function (done) {
    fixture.version.copyPackageJson();
    fixture.version.corruptPackageJson();
    ruche.version(function (err, version) {
      /*jshint unused:false */
      expect(err.code).to.eql(211);
      fixture.version.restorePackageJson();
      done();
    });
  });

});
