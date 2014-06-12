// Module dependencies
var debug = require('debug')('ruche:test:ruche:version');
var chai  = require('chai');
var ruche = require('../../lib/ruche');

// Initialization and configuration
var expect = chai.expect;

/**
 * Test suite for ruche:install
 */
describe('ruche:version', function () {

  it('should send a valid version', function (done) {
    ruche.version(function(err, data) {
      expect(data).to.match(/^\d+.\d+.\d+$/);
      done();
    });
  });

});