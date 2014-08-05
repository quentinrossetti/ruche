/* global describe, it, before, after */
'use strict';
var chai    = require('chai');
var u       = require('../../../lib/ruche/util');

// Initialization and configuration
var expect = chai.expect;

/*
 * Unit tests for ruche:util:event
 */
describe('ruche:util:event', function () {

  it('should have event methods', function () {
    expect(u.event).to.have.property('on');
    expect(u.event).to.have.property('emit');
  });

});
