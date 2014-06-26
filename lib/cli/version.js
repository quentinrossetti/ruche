// Module dependencies
'use strict';
var debug    = require('debug')('ruche:cli:version');
var cliUtil  = require('./util');
var ruche    = require('../ruche/version');

// Output the version number to sdtin.
var version = function (callback) {
  debug('cli.version() called');
  ruche(function (err, data) {
    if (err) {
      cliUtil.error(err);
    }

    console.log('v%s', data);

    if (callback !== undefined) {
      callback();
    }
  });

};

module.exports = version;
