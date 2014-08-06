'use strict';
var _    = require('underscore');
var fs   = require('fs');
var path = require('path');
var u    = {
  error: require('./error')
};

/**
 * Get the cache version of the ruche.json file if exists.
 * @param name [string] Software's name.
 * @param callback [function] Executed when done `(err, cacheArray)`.
 */
module.exports.json = function (name, callback) {

  var cacheFile = path.resolve(process.rc.dir.tmp, name + '.json');

  var stats;
  try {
    stats = fs.statSync(cacheFile);
  } catch (errStat) {
    // Can't read file
    callback(new u.error(210, errStat, { file: cacheFile }), null);
    return;
  }

  var dateNow   = new Date().getTime();
  var dateStale = stats.mtime.getTime() + process.rc.cache.time;
  var expired = dateStale < dateNow;
  if (expired) {
    // Cache expired
    callback(new u.error(220, null, { file: cacheFile }), null);
    return;
  }

  fs.readFile(cacheFile, function (errRead, cacheBuffer) {

    var cacheJson;
    try {
      cacheJson = JSON.parse(cacheBuffer);
    } catch (errCatch) {
      // Can't parse JSON file
      var errCallback = new u.error(211, errCatch, { json: cacheBuffer });
      fs.unlinkSync(cacheFile);
      callback(errCallback, null);
      return;
    }

    callback(null, cacheJson);
  });

};

/**
 * Download and cache an archive.
 * @param taskIndex [number] Position of the task in the `process.tasks` array.
 * @param callback [function] Executed when done `(err, filePath)`.
 */
module.exports.archive = function (taskIndex, callback) {

  var task = process.tasks[taskIndex];
  var fileName = _.last(task.match.link.split('/'));
  var filePath = path.resolve(process.rc.dir.tmp + '/' + fileName);

  if (!fs.existsSync(filePath)) {
    // Can't read file
    callback(new u.error(210, null, { file: filePath }), null);
    return;
  }

  callback(null, filePath);
};
