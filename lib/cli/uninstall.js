// Module dependencies
var debug    = require('debug')('ruche:cli:uninstall');
var humanize = require('humanize');
var colors   = require('colors');
var download = require('../../lib/ruche/util/download');
var emitter  = require('../../lib/ruche/util/emitter');
var ruche    = require('../../lib/ruche/uninstall');
var error    = require('./util/error');

/**
 * This function is a cli wrapper around `ruche.uninstall()`. It remove the
 * wanted packages and display some usefull information about the state of the
 * process.
 * @summary  Remove some packages.
 * @memberOf Cli
 * @param    {object} argv An usable object of arguments and options.
 * @param    {function} callback A callback function that is executed when the
 *           output has been written. It gets one argument `(data)`.
 * @example
 * var cli = require('./lib/cli');
 * cli.uninstall({ packages: ['curl'] }, function (data) {
 *   console.log(data); // output a second time
 * });
 * @see      {@link Ruche.install}
 * @since    0.0.1
 * @license  [The MIT License (MIT)]{@link http://git.io/QMeU-w}
 */
var uninstall = function (argv, callback) {
  var i1 = -1;
  var i2 = -1;
  var packages = argv.packages;
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
    emitter.on('uninstall-' + i, function (res) {
      i1++;
      long[i1]  = res.package + '-' + res.version + '-' + res.platform;
      match[i1] = res;
    });
    emitter.on('unreg-done-' + i, function (match) {
      i2++;
      var _clr = 'c' + (i2 % 6).toString();
      console.log('Uninstallation of %s done', long[i2][_clr]);
    });
  }

  ruche(packages, function (err, data) {
    if (err) {
      error(err);
      callback(undefined)
      return;
    }
    console.log('Uninstallation done!');
    if (callback !== undefined) {
      callback(data);
    }
  });

};

module.exports = uninstall;
