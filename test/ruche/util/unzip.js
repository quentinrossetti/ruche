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
 * Unit tests for ruche:util:unzip
 */
describe('ruche:util:unzip', function () {

  before(function () { fixture.env.before(); });
  after(function () { fixture.env.after(); });

  it('should unzip to the right place', function (done) {
    this.timeout(50000);
    var task = {
      name: 'curl',
      match: require('../../fixture/packages/curl/ruche.json')[0]
    };
    var source = __dirname + '/../../fixture/packages/curl/curl-7.37.0-win64.zip';
    var dest   = process.rc.dir.tmp + '/curl-7.37.0-win64.zip';
    source = path.resolve(source);
    dest   = path.resolve(dest);
    process.tasks[0] = task;
    fs.writeFileSync(dest, fs.readFileSync(source));
    u.unzip.zip(0, function (err, data) {
      console.dir(err);
      console.dir(data);
      done();
    });
  });

});
