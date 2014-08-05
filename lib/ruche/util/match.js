'use strict';
var _     = require('underscore');
var os    = require('os');
var sort  = require('version-sort');
var u     = {
  error: require('./error')
};

/**
 * Determine the current platform.
 * @returns {string} Could be: win32, win64, osx32, osx64, linux32, or linux64.
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

/**
 * Find appropriate software versions in a cache array.
 * @param software [object] Formatted wish software.
 * @param cache [array] Cache from a `ruche.json` file.
 * @returns {Array} Appropriate software versions.
 * @see `software` argument must be formatted with `format.software()` in
 * {@link format.js}
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
    // Software not found
    throw new u.error(230, null, { software: software });
  }

  return matches;

};
