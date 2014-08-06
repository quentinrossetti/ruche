// Module dependencies
'use strict';
var fs     = require('fs');
var tar    = require('tar');
var zlib   = require('zlib');
var path   = require('path');
var mkdirp = require('mkdirp');
var u      = {
  error: require('./error'),
  event: require('./event')
};

/**
 * Extract a package in the share directory.
 * @param taskIndex [number] Position of the task in the `process.tasks` array.
 * @param callback [function] Executed when done `(err)`.
 */
var extract = function (taskIndex, callback) {

  var task = process.tasks[taskIndex];
  var long = task.name + '-' + task.version + '-' + task.platform;
  var share = u.format.untildify(process.rc.dir.share + '/' + task.name);

  if (!fs.existsSync(share)) {
    mkdirp.sync(share);
  }

  var gzFile = path.resolve(process.rc.dir.tmp + '/' + long + '.tar.gz');
  var tarFile = path.resolve(process.rc.dir.tmp + '/' + long + '.tar');

  if (!fs.existsSync(gzFile)) {
    callback(new u.error(112, null, { file: gzFile}), null);
    return;
  }

  var gzStream = fs.createReadStream(gzFile);
  var tarStream = fs.createWriteStream(tarFile);

  // On data
  gzStream.on('data', function (chunk) {
    u.event.emit('gz-data-', taskIndex, chunk.length);
  });
  tarStream.on('data', function (chunk) {
    u.event.emit('tar-data-', taskIndex, chunk.length);
  });

  // Untar
  gzStream.on('end', function () {
    u.event.emit('gz-end', taskIndex);

    var tarSize = fs.statSync(tarFile).size;
    process.tasks[taskIndex].tarSize = tarSize;
    u.event.emit('tar-start', taskIndex, tarSize);
    tarStream = fs.createReadStream(tarFile);

    tarStream.pipe(tar.Extract({ path: share })).on('end', function () {
      fs.unlink(tarFile, function () {
        u.event.emit('tar-end', taskIndex);
        callback(null);
      });
    });

  });

  // Unzip
  var gzSize = fs.statSync(gzFile).size;
  process.tasks[taskIndex].gzSize = gzSize;
  u.event.emit('gz-start', taskIndex, gzSize);
  gzStream.pipe(zlib.Gunzip()).pipe(tarStream);
};

module.exports = extract;
