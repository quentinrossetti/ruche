'use strict';
var _     = require('underscore');
var fs    = require('fs');
var os    = require('os');
var path  = require('path');
var sort  = require('version-sort');
var u     = {
  error: require('./error')
};

/*
 * Get the cache version of the ruche.json file if exists.
 */
module.exports.cache = function (name, callback) {

  var cacheFile = path.resolve(process.rc.dir.tmp, name + '.json');

  var stats;
  try {
    stats = fs.statSync(cacheFile);
  } catch (errStat) {
    // Can't read file
    callback(new u.error(210), errStat);
    return;
  }

  var dateNow   = new Date().getTime();
  var dateStale = stats.mtime.getTime() + process.rc.cache.time;
  var expired = dateStale < dateNow;
  if (expired) {
    // Cache expired
    callback(new u.error(220));
    return;
  }

  fs.readFile(cacheFile, function (errRead, cacheBuffer) {

    var cacheJson;
    try {
      cacheJson = JSON.parse(cacheBuffer);
    } catch (errCatch) {
      var errCallback = new u.error(211, errCatch);
      fs.unlinkSync(cacheFile);
      callback(errCallback, null);
      return;
    }

    callback(null, cacheJson);
  });

};

/*
 * Determine platform
 */
module.exports.platform = function () {

  var platforms = [ 'win32', 'win64', 'osx32', 'osx64', 'linux32', 'linux64' ];
  var compare   = [
    'win32-ia32',
    'win32-x64',
    'darwin-ia32',
    'darwin-x64',
    'linux-ia32',
    'linux-x64'
  ];
  var local    = os.platform() + '-' + os.arch();
  var index    = _.indexOf(compare, local);
  return platforms[index] || 'linux32';

};

/*
 * Find a software
 */
module.exports.find = function(software, cache) {

  var matches = [];
  var platform = software.platform || this.platform();
  // Cache sorted by version from latest to oldest
  var sorted = sort(cache, {
    nested: 'version',
    ignore_stages: process.rc.software.stable
  }).reverse();

  sorted.forEach(function (_sorted) {
    // Platform not match
    if (_sorted.platform !== platform) {
      return;
    }
    // Options not match
    if (_sorted.options !== software.options) {
      return;
    }
    // Version not match (no version specified)
    if (!software.version) {
      matches.push(_sorted);
      return;
    }
    // Version not match (not the same as specified)
    if (_sorted.version !== software.version) {
      return;
    }
    matches.push(_sorted);
  });

  if (matches.length === 0) {
    throw new u.error(230);
  }

  return matches;

};
