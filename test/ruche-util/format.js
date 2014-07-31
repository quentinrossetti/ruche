/* global describe, it */
'use strict';
var chai = require('chai');
var u    = require('../../lib/ruche/util');

// Initialization and configuration
var expect = chai.expect;

/*
 * Unit tests for ruche:util:format
 */
describe('ruche:util:format', function () {

  it('`software` should return only the name', function () {
    var software = u.format.software('git');
    expect(software.name).to.eql('git');
    expect(software.version).to.eql(null);
    expect(software.options).to.eql(null);
    expect(software.platform).to.eql(null);
  });

  it('`software-0.0.1` should return the name and version', function () {
    var software = u.format.software('git-0.0.1');
    expect(software.name).to.eql('git');
    expect(software.version).to.eql('0.0.1');
    expect(software.options).to.eql(null);
    expect(software.platform).to.eql(null);
  });

  it('`software-0.0.1beta3` should return the name and version', function () {
    var software = u.format.software('git-0.0.1beta3');
    expect(software.name).to.eql('git');
    expect(software.version).to.eql('0.0.1beta3');
    expect(software.options).to.eql(null);
    expect(software.platform).to.eql(null);
  });

  it('`software-win64` should return the name and platform', function () {
    var software = u.format.software('software-win64');
    expect(software.name).to.eql('software');
    expect(software.version).to.eql(null);
    expect(software.options).to.eql(null);
    expect(software.platform).to.eql('win64');
  });

  it('`soft2-24.1-win64` should return name, version, platform', function () {
    var software = u.format.software('soft2-24.1-win64');
    expect(software.name).to.eql('soft2');
    expect(software.version).to.eql('24.1');
    expect(software.options).to.eql(null);
    expect(software.platform).to.eql('win64');
  });

  it('`s2-2.1rc5-ssl_v6-win64` should return a complete spec', function () {
    var software = u.format.software('s2-2.1rc5-ssl_v6-win64');
    expect(software.name).to.eql('s2');
    expect(software.version).to.eql('2.1rc5');
    expect(software.options).to.eql([ 'ssl', 'v6' ]);
    expect(software.platform).to.eql('win64');
  });

  it('`test?` should fail', function () {
    try {
      u.format.software('test?');
    } catch (err) {
      /*jshint expr:true */
      expect(err).to.exist;
      /*jshint expr:false */
    }
  });

  it('should untilde', function () {
    var untilde = u.format.untildify(__dirname);
    expect(untilde).to.eql(require('path').resolve(__dirname));
  });

});
