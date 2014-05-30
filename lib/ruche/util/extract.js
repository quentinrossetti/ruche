// Module dependencies.
var debug = require('debug')('ruche:extract');
var rc = require('rc')('ruche');
var zlib = require('zlib');
var tar = require('tar');
var fs = require('fs');
var parser = require('./parser');
var emitter = require('./emitter');

/**
 * Extract a package in the share directory
 * @param {Object}  match The match from ruche.json
 * @param {Integer} k     The index of the current package in the list of 
 *                        packages you want.
 * @fires RucheEmitter#gz-start-i
 * @fires RucheEmitter#gz-data-i
 * @fires RucheEmitter#gz-done-i
 * @fires RucheEmitter#tar-start-i
 * @fires RucheEmitter#tar-data-i
 * @fires RucheEmitter#tar-done-i
 */
var extract = function (match, k) {
    
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
    error.handle(err);
  });
  tarStream.on('error', function (err) {
    error.handle(err);
  });

  // On data
  gzStream.on('data', function (chunk) {
    emitter.emit('gz-data-' + k, chunk);
  });

  // Untar
  gzStream.on('end', function () {
    debug('Uncompressed to file system: %s.tar.gz', long);
    emitter.emit('gz-done-' + k);
    emitter.emit('tar-start-' + k, match, fs.statSync(tarFile)['size']);
    tarStream = fs.createReadStream(tarFile);
    tarStream.on('data', function (chunk) {
      emitter.emit('tar-data-' + k, chunk);
    });
    tarStream.pipe(tar.Extract({ path: share })).on('end', function () {
      debug('Untar to file system: %s.tar', long);
      emitter.emit('tar-done-' + k);
    });
  });

  // Unzip
  emitter.emit('gz-start-' + k, match, fs.statSync(gzFile)['size']);
  gzStream.pipe(zlib.Gunzip()).pipe(tarStream);
};

module.exports = extract;