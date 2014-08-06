'use strict';
var _ = require('underscore');
var path = require('path');
var fs = require('fs');
var unzip = require('unzip');
var mkdirp = require('mkdirp');
var u = {
  error: require('./error'),
  format: require('./format')
};

module.exports.zip = function (taskIndex, callback) {

  var task     = process.tasks[taskIndex];
  var fileName = _.last(task.match.link.split('/'));
  var filePath = path.resolve(process.rc.dir.tmp, fileName);
  var fileLong = u.format.long(task.match);

  // Create share directory
  var shareRc  = process.rc.dir.share + '/' + task.match.name + '/' + fileLong;
  shareRc = path.resolve(shareRc);
  try {
    mkdirp.sync(shareRc);
  } catch (errMkdir) {
    callback(new u.error(212, errMkdir, { file: shareRc }), null);
    return;
  }

  //
  var fileSize   = fs.statSync(filePath).size;
  var fileStream = fs.createReadStream(filePath);
  var destStream = unzip.Extract({ path: process.rc.dir.tmp });
  var destSize   = 0;
  var destPath   = path.resolve(process.rc.dir.tmp, task.match.share);

//  fileStream.on('data', function (chunk) {
//    destSize += chunk.length;
//  });
//
//  fileStream.on('end', function () {
//    fileStream.close(function() {
//      if (fileSize !== destSize) {
//        //FIXME: Correct error
//        callback('Unfinished business!', null);
//        return;
//      }
//      callback(null, destPath);
//    });
//  });

  fileStream.pipe(destStream).on('finish', function () {
    fileStream.close();
    callback(null, 'done');
  });
};
