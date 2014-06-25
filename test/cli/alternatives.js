// Module dependencies
/* global describe, it, before, after, beforeEach, afterEach */
'use strict';
var debug   = require('debug')('ruche:test:cli');
var fs      = require('fs');
var chai    = require('chai');
var rimraf  = require('rimraf');
var cli     = require('../../lib/cli');
var util    = require('../../lib/cli/util');
var untilde = require('../../lib/ruche/util/untilde');
var emitter = require('../../lib/ruche/util/emitter');
var fixture = require('../fixture');

// Initialization and configuration
var expect = chai.expect;
var stdout = process.stdout;
fixture.stdout(stdout);

/**
 * Test suite for cli:alternatives
 */
describe('cli:alternatives', function () {

  before(function () {
    debug('Test suite for cli:alternatives started');
    fixture.env.before();
    fixture.server.before();
    emitter.removeAllListeners();
  });
  after(function () {
    fixture.env.after();
    emitter.removeAllListeners();
    debug('Test suite for cli:alternatives ended');
  });

  it('should print alternatives to stdout', function (done) {
    var capture = [];
    var test = util.argv(fixture.argv('ruche alternatives fixpack'));
    // Add some alternatives
    fs.mkdirSync(untilde('@/.tmp/test/share/fixpack'));
    fs.mkdirSync(untilde('@/.tmp/test/share/fixpack/fixpack-0.0.1-win32'));
    fs.mkdirSync(untilde('@/.tmp/test/share/fixpack/fixpack-0.0.2-win32'));
    fs.writeFileSync(untilde('@/.tmp/test/bin/run.cmd'), '');

    stdout.hook('write', function(string, encoding, fd, write) {
        capture.push(string);
    }, true);

    emitter.on('cli-alt-show', function () {
      emitter.emit('cli-alt-choice', 0);
    });

    cli.alternatives(test, function (data) {
      stdout.unhook('write');
      expect(capture[1]).to.contain('fixpack-0.0.1-win32');
      expect(capture[2]).to.contain('fixpack-0.0.2-win32');
      expect(capture[7]).to.contain('done');
      done();
    });
  });

  it('should print an error on unknown package', function (done) {
    var capture = [];
    emitter.removeAllListeners();
    rimraf.sync(untilde('@/.tmp/test/share/fixpack/'));
    stdout.hook('write', function(string, encoding, fd, write) {
        capture.push(string);
    }, true);
    var test = util.argv(fixture.argv('ruche alternatives fixpack'));
    cli.alternatives(test, function (data) {
      stdout.unhook('write');
      expect(capture[0]).to.contain('Error');
      done();
    });
  });

});
