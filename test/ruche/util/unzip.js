/* global describe, it, before, after, beforeEach */
'use strict';
var chai    = require('chai');
var fs      = require('fs');
var path    = require('path');
var fixture = require('../../fixture');
var u       = require('../../../lib/ruche/util');

// Initialization and configuration
var expect = chai.expect;

/*
 * Unit tests for ruche:util:unzip
 */
describe('ruche:util:unzip', function () {

  before(function () { fixture.env.before(); });
  after(function () { fixture.env.after(); });
  beforeEach(function () { fixture.env.beforeEach(); });

  it('should get an error if archive not here', function (done) {
    fixture.u.unzip.createTask();
    fixture.u.unzip.corruptTaskPresence();
    u.unzip(0, function (err) {
      expect(err.code).to.eql(112);
      done();
    });
  });

  it('should extract to the right path', function (done) {
    fixture.u.unzip.createTask();
    u.unzip(0, function (err) {
      var p = path.resolve('.test/share/acme/acme-0.0.1-linux32/bin1.sh');
      expect(fs.existsSync(p)).to.eql(true);
      expect(err).to.eql(null);
      done();
    });
  });

});
