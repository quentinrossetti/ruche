// Module dependencies
var debug    = require('debug')('ruche:cli:install');
var humanize = require('humanize');
var colors   = require('colors');
var emitter  = require('../../lib/ruche/util/emitter');
var error    = require('./util/error');
var ruche    = require('../../lib/ruche/install');

var install = function (argv, callback) {
  var i1 = -1;
  var i2 = -1;
  var i3 = -1;
  var i4 = -1;
  var packages =  argv.packages;
  var match = [];
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
    emitter.on('install-' + i, function (res) {
      i1++;
      long[i1]  = res.package + '-' + res.version + '-' + res.platform;
      match[i1] = res;
    });
    emitter.on('dl-start-' + i, function (length) {
      i2++;
      var _len = humanize.filesize(length);
      var _clr = 'c' + (i2 % 6).toString();
      console.log('Downloading %s %s...', long[i2][_clr], _len);
    });
    emitter.on('tar-start-' + i, function (length) {
      i3++;
      var _len = humanize.filesize(length);
      var _clr = 'c' + (i3 % 6).toString();
      console.log('Extracting %s %s...', long[i3][_clr], _len);
    });
    emitter.on('reg-done-' + i, function () {
      i4++;
      var _clr = 'c' + (i4 % 6).toString();
      console.log('Registering %s...', long[i4][_clr]);
    });
  }

  ruche(packages, function (err, data) {
    if (err) {
      error(err);
      callback(undefined)
      return;
    }
    console.log('Installation done!');
    if (callback !== undefined) {
      callback(data);
    }
  });

};

module.exports = install;
