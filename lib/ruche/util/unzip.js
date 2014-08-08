// Module dependencies
'use strict';
var fs      = require('fs');
var fstream = require('fstream');
var tar     = require('tar');
var zlib    = require('zlib');
var path    = require('path');
var u       = {
  error: require('./error'),
  event: require('./event')
};

/**
 * Extract a package in the share directory.
 * @param taskIndex [number] Position of the task in the `process.tasks` array.
 * @param callback [function] Executed when end `(err)`.
 */
var extract = function (taskIndex, callback) {

  var task = process.tasks[taskIndex];
  var share = path.resolve(process.rc.dir.share + '/' + task.name);

  var gzFile = process.tasks[taskIndex].gzPath;

  if (!fs.existsSync(gzFile)) {
    callback(new u.error(112, null, { file: gzFile } ), null);
    return;
  }

  fstream.Reader({ path: gzFile, type: 'File' })
    .pipe(zlib.createGunzip())
    .on('data', function (chunk) {
      u.event.emit('gz-data', taskIndex, chunk.length);
    })
    .on('end', function () {
      u.event.emit('gz-end', taskIndex);
    })
    .pipe(tar.Extract({ path: share }))
    .on('data', function (chunk) {
      u.event.emit('tar-data', taskIndex, chunk.length);
    })
    .on('end', function () {
      u.event.emit('tar-end', taskIndex);
      callback(null);
      return;
    });
};

module.exports = extract;
