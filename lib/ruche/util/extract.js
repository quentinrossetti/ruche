// Module dependencies
'use strict';
var debug   = require('debug')('ruche');
var rc      = require('rc')('ruche');
var zlib    = require('zlib');
var tar     = require('tar');
var fs      = require('fs');
var parser  = require('./parser');
var emitter = require('./emitter');

/**
 * This method use a precedent download and extract it. This uses `rc` module
 * to determine the the `tpm` and `share` directories, respectively where
 * download are stored and where to extract them.
 * @summary  Extract a package in the share directory
 * @memberOf RucheUtil
 * @param    {object} match An object of parameters about the package that will
 *           be extracted. Typically this value come from a `ruche.json` file.
 * @param    {number} i This identify the current operation. This is usefull
 *           for catching events when *multiple extractions* are required. `i`
 *           is used in the name of the events that are fired.
 * @param    {function} callback A callback function that is executed when the
 *           file is extracted and written to the file system. It gets two
 *           arguments `(err, location)` where `location` is the local path to
 *           the file.
 * @example
 * var rucheUtil = require('./lib/ruche/util');
 * rucheUtil.extract(match, 0, function (err) {
 *   if (err) {
 *     // handle your error
 *   }
 *   console.log('Package extracted');
 * });
 * @fires    RucheEmitter#gz-start-i
 * @fires    RucheEmitter#gz-data-i
 * @fires    RucheEmitter#gz-done-i
 * @fires    RucheEmitter#tar-start-i
 * @fires    RucheEmitter#tar-data-i
 * @fires    RucheEmitter#tar-done-i
 * @requires debug
 * @requires zlib
 * @requires tar
 * @requires rc
 * @since    0.0.1
 * @license  [The MIT License (MIT)]{@link http://git.io/QMeU-w}
 */
var extract = function (match, k, callback) {

  var long = match.package + '-' + match.version + '-' + match.platform;
  var share = parser.untilde(rc.dir.share + '/' + match.package);

  if (!fs.existsSync(share)) {
    fs.mkdirSync(share);
  }

  var gzFile = parser.untilde(rc.dir.tmp + '/' + long + '.tar.gz');
  var tarFile = parser.untilde(rc.dir.tmp + '/' + long + '.tar');
  var gzStream = fs.createReadStream(gzFile);
  var tarStream = fs.createWriteStream(tarFile);

  // Error handling
  gzStream.on('error', function (err) {
    callback(err, undefined);
  });
  tarStream.on('error', function (err) {
    callback(err, undefined);
  });

  // On data
  gzStream.on('data', function (chunk) {
    /**
     * Emitted when receiving data from unzipping. `i` is an identifier.
     * @event RucheUtil#gz-data-i
     * @type  {object}
     * @param {object} chunk Chunk of data
     * @see   RucheUtil.extract
     */
    emitter.emit('gz-data-' + k, chunk);
  });

  // Untar
  gzStream.on('end', function () {
    debug('Uncompressed to file system: %s.tar.gz', long);
    /**
     * Emitted when unzipping is done. `i` is an identifier.
     * @event RucheUtil#gz-done-i
     * @type  {object}
     * @see   RucheUtil.extract
     */
    emitter.emit('gz-done-' + k);
    /**
     * Emitted when starting un-tar. `i` is an identifier.
     * @event RucheUtil#tar-start-i
     * @type  {object}
     * @param {number} length The total length of the file
     * @see   RucheUtil.extract
     */
    emitter.emit('tar-start-' + k, match, fs.statSync(tarFile).size);
    tarStream = fs.createReadStream(tarFile);
    tarStream.on('data', function (chunk) {
      /**
       * Emitted when receiving data from tar. `i` is an identifier.
       * @event RucheUtil#dl-data-i
       * @type  {object}
       * @param {object} chunk Chunk of data
       * @see   RucheUtil.extract
       */
      emitter.emit('tar-data-' + k, chunk);
    });
    tarStream.pipe(tar.Extract({ path: share })).on('end', function () {
      debug('Untar to file system: %s.tar', long);
      /**
       * Emitted when the package is copied into `share`. `i` is an identifier.
       * @event RucheUtil#tar-done-i
       * @type  {object}
       * @see   RucheUtil.extract
       */
      emitter.emit('tar-done-' + k);
      callback(undefined, gzFile);
    });
  });

  // Unzip
  /**
   * Emitted when starting unzipping. `i` is an identifier.
   * @event RucheUtil#gz-start-i
   * @type  {object}
   * @param {number} length The total length of the file
   * @see   RucheUtil.extract
   */
  emitter.emit('gz-start-' + k, fs.statSync(gzFile).size);
  gzStream.pipe(zlib.Gunzip()).pipe(tarStream);
};

module.exports = extract;
