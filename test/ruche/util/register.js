/* global describe, it, before, after */
'use strict';
var chai    = require('chai');
var fixture = require('../../fixture');
var u       = require('../../../lib/ruche/util');

// Initialization and configuration
var expect = chai.expect;

/*
 * Unit tests for ruche:util:register
 */
describe('ruche:util:register', function () {

  before(function () { fixture.env.before(); });
  after(function () { fixture.env.after(); });

  it('should get null when there is noting to register', function () {
    fixture.u.register.createTaskNoBin();
    expect(u.register(0)).to.eql(null);
  });

  it('should get true on success', function () {
    fixture.u.register.createTask();
    expect(u.register(0)).to.eql(true);
  });

});
