// Module dependencies.
var debug = require('debug')('ruche:match');
var _ = require('underscore');

/**
 * Match the lastest version of a package compatible with the user's platform
 * @param  {Object} data     The ruche.json file
 * @param  {Object} package  Package and spec you want
 * @return {Object|false}    Return the info of the matched package. Otherwise
 *                           false is returned.
 */
var match = function match(data, package) {
  var sortByVersion = data.sort(function(a,b) {
    return parseFloat(b.version) - parseFloat(a.version)
  });

  // No version and no platform specified
  if (_.isUndefined(package.version) && _.isUndefined(package.platform)) {
    var platform = 'win' + process.env.architecture;
    for (var i = 0; i < sortByVersion.length; i++) {
      var c = sortByVersion[i];
      if (c.platform === platform) {
        debug('Match found for %s: %j', platform, c);
        return c;
      } 
    }
    debug('Match found: %j', sortByVersion[0]);
    return sortByVersion[0];
  
  // Version and platform specified
  } else if (!_.isUndefined(package.version) && !_.isUndefined(package.platform)) {
    for (var i = 0; i < sortByVersion.length; i++) {
      var c = sortByVersion[i];
      if (c.version === package.version && c.platform === package.platform) {
        debug('Match found: %j', c);
        return c;
      }
    }
  }

  // Otherwise or no match
  debug('No match found for ' + package.package);
  return false;
}

module.exports = match;