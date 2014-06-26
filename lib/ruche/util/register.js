// Module dependencies.
'use strict';
var debug   = require('debug')('ruche');
var rc      = require('rc')('ruche');
var fs      = require('fs');
var path    = require('path');
var untilde = require('./untilde');
var emitter = require('./emitter');

/**
 * Read a entry of a `ruche.json` file and copy and make aliases for all files
 * under the `bin` category. Those aliases are placed in the `bin` local folder
 * indicated by the `rc` configuration.
 * @summary  Register all the binaries of a packages
 * @memberOf RucheUtil
 * @param    {object} match An object of parameters about the package that will
 *           be downloaded. Typically this value come from a `ruche.json` file.
 * @param    {number} i This identify the current operation. This is usefull
 *           for catching events when *multiple operations* are required. `i`
 *           is used in the name of the events that are fired.
 * @param    {function} callback A callback function that is executed when the
 *           aliases are created. It gets one argument `binaries`.
 * @example
 * var rucheUtil = require('./lib/ruche/util');
 * rucheUtil.register(match, 0, function (binaries) {
 *   console.log(binaries); // where the aliases are located
 *     // [
 *     //   { bin: 'run', file: 'path/to/run'},
 *     //   { bin: 'stop', file: 'path/to/stop'}
 *     // ]
 * });
 * @fires    RucheUtil#reg-start-i
 * @fires    RucheUtil#reg-data-i
 * @fires    RucheUtil#reg-done-i
 * @requires debug
 * @requires fs
 * @requires path
 * @requires rc
 * @requires underscore
 * @since    0.0.1
 * @license  [The MIT License (MIT)]{@link http://git.io/QMeU-w}
 */
var register  = function (match, l, callback) {

  if (match.bin === undefined) {
    callback(null);
    return;
  }

  /**
   * Emitted when start registering. `i` is an identifier.
   * @event RucheUtil#reg-start-i
   * @type  {object}
   * @param {number} length The number of aliases to register.
   * @see   RucheUtil.register
   */
  var long = match.package + '-' + match.version + '-' + match.platform;
  var share = untilde(rc.dir.share + '/' + match.package);
  var pathrc = untilde(rc.dir.path);

  emitter.on('reg-data-' + l, function (chunk) {
    if (chunk + 1 === Object.keys(match.bin).length) {
      /**
       * Emitted when all aliases are created. `i` is an identifier.
       * @event RucheUtil#reg-done-i
       * @type  {object}
       * @see   RucheUtil.register
       */
      emitter.emit('reg-done-' + l);
      callback(binaries);
    }
  });

  var file;
  var txt;
  var binaries = {};
  var chunk = -1;
  for (var bin in match.bin) {
    chunk++;
    file = path.resolve(pathrc + '/' + bin + '.cmd');
    txt  = '@echo off\n';
    txt += '"' + share + '\\' + long + '\\' + match.bin[bin] + '" %*';
    binaries[bin] = file;
    fs.writeFileSync(file, txt);
    debug('Registered to %PATH%: %s', match.bin[bin]);
    /**
     * Emitted when an alias is created. `i` is an identifier.
     * @event RucheUtil#reg-data-i
     * @type  {object}
     * @param {number} chunk Identifier: registered file index
     * @see   RucheUtil.register
     */
    emitter.emit('reg-data-' + l, chunk);
  }

};

module.exports = register;
