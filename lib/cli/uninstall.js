// Module dependencies
'use strict';
var debug    = require('debug')('ruche:cli:uninstall');
var colors   = require('colors');
var cliUtil  = require('./util');
var ruche    = require('../ruche/uninstall');
var util     = require('../ruche/util');

// Remove some packages.
var uninstall = function (argv, callback) {
  var i1 = -1;
  var i2 = -1;
  var packages = argv.packages;
  var long  = [];

  colors.setTheme({
    'c0': 'cyan',
    'c1': 'magenta',
    'c2': 'green',
    'c3': 'blue',
    'c4': 'red',
    'c5': 'yellow'
  });

  for (var i = 0; i < packages.length; i++) {
    util.emitter.on('uninstall-' + i, function (res) {
      i1++;
      long[i1]  = res.package + '-' + res.version + '-' + res.platform;
      match[i1] = res;
    });
    util.emitter.on('unreg-done-' + i, function (match) {
      i2++;
      var _clr = 'c' + (i2 % 6).toString();
      console.log('Uninstallation of %s done', long[i2][_clr]);
    });
  }

  ruche(packages, function (err, data) {
    if (err) {
      cliUtil.error(err);
      if (callback !== undefined) {
        callback(undefined);
      }
      return;
    }
    debug('Uninstall command called from CLI');
    console.log('Uninstallation done!');
    if (callback !== undefined) {
      callback(data);
    }
  });

};

module.exports = uninstall;
