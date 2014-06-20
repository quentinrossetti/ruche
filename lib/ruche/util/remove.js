// Module dependencies
'use strict';
var debug   = require('debug')('ruche:remove');
var rc      = require('rc')('ruche');
var fs      = require('fs');
var path    = require('path');
var rimraf  = require('rimraf');
var untilde = require('./untilde');
var error   = require('./error');
var emitter = require('./emitter');

/**
 * Unregister all the binaries of a packages
 * @param {Object}  match The match from ruche.json
 * @param {Integer} i     The index of the current package in the list of
 *                        packages you want.
 * @fires RucheEmitter#unreg-start-i
 * @fires RucheEmitter#unreg-done-i
 */
/**
 * Remove a package from the local **ruche** installation. It uses the `rc`
 * module to find the directories to empty and a `ruche.json` file to find the
 * binaires to unregister.
 * @summary  Unregister all the binaries of a packages and remove files
 * @memberOf RucheUtil
 * @param    {object} match An object of parameters about the package that will
 *           be downloaded. Typically this value come from a `ruche.json` file.
 * @param    {number} i This identify the current operation. This is usefull
 *           for catching events when *multiple operations* are required. `i`
 *           is used in the name of the events that are fired.
 * @param    {function} callback A callback function that is executed when all
 *           is done.
 * @example
 * var rucheUtil = require('./lib/ruche/util');
 * rucheUtil.remove(match, 0, function () {
 *   console.log('Done!');
 * });
 * @fires    RucheUtil#unreg-start-i
 * @fires    RucheUtil#unreg-done-i
 * @requires debug
 * @requires fs
 * @requires path
 * @requires rc
 * @requires underscore
 * @since    0.0.1
 * @license  [The MIT License (MIT)]{@link http://git.io/QMeU-w}
 */
var remove = function (match, i, callback) {
  /**
   * Emitted when start removing. `i` is an identifier.
   * @event RucheUtil#unreg-start-i
   * @type  {object}
   * @see   RucheUtil.remove
   */
  /**
   * Emitted when removing is done. `i` is an identifier.
   * @event RucheUtil#unreg-done-i
   * @type  {object}
   * @see   RucheUtil.remove
   */
  emitter.emit('unreg-start-' + i);
  var long = match.package + '-' + match.version + '-' + match.platform;

  // Remove binaries
  if (match.bin !== undefined) {
    for (var bin in match.bin) {
      fs.unlinkSync(untilde('@/.tmp/test/bin/' + bin + '.cmd'));
    }
  }

  // Remove share
  var shareLong = untilde('@/.tmp/test/share/' + match.package + '/' + long);
  var sharePack = untilde('@/.tmp/test/share/' + match.package);
  rimraf.sync(shareLong);
  if (fs.readdirSync(sharePack).length === 0) {
    rimraf.sync(sharePack);
  }

  // Remove etc
  var etc = untilde('@/.tmp/test/etc/' + match.package);
  if (fs.existsSync(etc)) {
    rimraf.sync(etc);
  }

  callback();
};

module.exports = remove;
