// Module dependencies
'use strict';
var debug   = require('debug')('ruche');
var fs      = require('fs');
var rc      = require('rc')('ruche');
var tar     = require('tar');
var zlib    = require('zlib');
var emitter = require('./emitter');
var untilde = require('./untilde');

// Extract a package in the share directory
var extract = function (match, k, callback) {

  var long = match.package + '-' + match.version + '-' + match.platform;
  var share = untilde(rc.dir.share + '/' + match.package);

  if (!fs.existsSync(share)) {
    fs.mkdirSync(share);
  }

  var gzFile = untilde(rc.dir.tmp + '/' + long + '.tar.gz');
  var tarFile = untilde(rc.dir.tmp + '/' + long + '.tar');

  if (!fs.existsSync(gzFile)) {
    callback(new Error('No downloaded package to extract'), undefined);
    return;
  }

  var gzStream = fs.createReadStream(gzFile);
  var tarStream = fs.createWriteStream(tarFile);

  // On data
  gzStream.on('data', function (chunk) {
    emitter.emit('gz-data-' + k, chunk);
  });

  // Untar
  gzStream.on('end', function () {
    debug('Uncompressed to file system: %s.tar.gz', long);
    emitter.emit('gz-done-' + k);
    emitter.emit('tar-start-' + k, fs.statSync(tarFile).size);
    tarStream = fs.createReadStream(tarFile);
    tarStream.on('data', function (chunk) {
      emitter.emit('tar-data-' + k, chunk);
    });
    tarStream.pipe(tar.Extract({ path: share })).on('end', function () {
      debug('Untar to file system: %s.tar', long);
      fs.unlink(tarFile, function () {
        emitter.emit('tar-done-' + k);
        callback(undefined, gzFile);
      });

    });
  });

  // Unzip
  emitter.emit('gz-start-' + k, fs.statSync(gzFile).size);
  gzStream.pipe(zlib.Gunzip()).pipe(tarStream);
};

module.exports = extract;
