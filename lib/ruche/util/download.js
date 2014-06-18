// Module dependencies
'use strict';
var debug   = require('debug')('ruche');
var rc      = require('rc')('ruche');
var http    = require('http');
var fs      = require('fs');
var emitter = require('./emitter');
var parser  = require('./parser');

/**
 * Download a ruche package from a repository. This uses `rc` module to
 * determine the source repository and the output directory.
 * @summary  Download a package
 * @memberOf RucheUtil
 * @param    {object} match An object of parameters about the package that will
 *           be downloaded. Typically this value come from a `ruche.json` file.
 * @param    {number} i This identify the current download. This is usefull for
 *           catching events when *multiple downloads* are required. `i` is
 *           used in the name of the events that are fired.
 * @param    {function} callback A callback function that is executed when the
 *           file is downloaded and written to the file system. It gets two
 *           arguments `(err, location)` where `location` is the local path to
 *           the file.
 * @example
 * var rucheUtil = require('./lib/ruche/util');
 * rucheUtil.download(match, 0, function (err, location) {
 *   if (err) {
 *     // handle your error
 *   }
 *   console.log(location); // where the file is located
 * });
 * @throws   Unaccessible URI
 * @fires    RucheUtil#dl-start-i
 * @fires    RucheUtil#dl-data-i
 * @fires    RucheUtil#dl-done-i
 * @requires debug
 * @requires fs
 * @requires http
 * @requires rc
 * @since    0.0.1
 * @license  [The MIT License (MIT)]{@link http://git.io/QMeU-w}
 */
var download = function (match, i, callback) {
  var e;
  var long = match.package + '-' + match.version + '-' + match.platform;
  var link = rc.repository + '/' + match.package + '/dist/' + long + '.tar.gz';

  var gzFile = parser.untilde(rc.dir.tmp + '/' + long + '.tar.gz');
  var gzStream = fs.createWriteStream(gzFile);

  // Make an HTTP request to get the file
  var req = http.get(link, function (res) {
    if (res.statusCode >= 400) {
      e = new Error('Unaccessible URI');
    }
    res.pipe(gzStream);
    gzStream.on('finish', function () {
      gzStream.close(function () {
        debug('Written to file sytsem: %s.tar.gz', long);
        /**
         * Emitted when the file is downloaded and written to the file system.
         * `i` is an identifier.
         * @event RucheUtil#dl-done-i
         * @type  {object}
         * @see   RucheUtil.download
         */
        emitter.emit('dl-done-' + i);
        callback(e, gzFile);
      });
    });
  });

  // Capture the HTTP response
  req.on('response', function (res) {
    var contentLength = parseInt(res.headers['content-length'], 10);
    /**
     * Emitted when starting download. `i` is an identifier.
     * @event RucheUtil#dl-start-i
     * @type  {object}
     * @param {number} length The total length of the file
     * @see   RucheUtil.download
     */
    emitter.emit('dl-start-' + i, contentLength);

    // When receiving data (chunk by chunk)
    res.on('data', function (chunk) {
      /**
       * Emitted when receiving data. `i` is an identifier.
       * @event RucheUtil#dl-data-i
       * @type  {object}
       * @param {object} chunk Chunk of data
       * @see   RucheUtil.download
       */
      emitter.emit('dl-data-' + i, chunk);
    });

  });

};

module.exports = download;
