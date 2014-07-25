/* global describe, it */
'use strict';
var chai  = require('chai');
var ruche = require('../../lib/ruche');

// Initialization and configuration
var expect = chai.expect;

/**
 * Unit tests for ruche:version
 */
describe('ruche:version', function () {

  it('should callback valid version number', function (done) {
    var regexp = /^v\d.\d.\d$/;
    var result;
    ruche.version(function (err, version) {
      result = regexp.test(version);
      expect(result).to.eq(true);
      done();
    });
  });

  //TODO: should callback a 210 error when package.json file is missing
  //TODO: should callback a 211 error when package.json file is corrupted

});
