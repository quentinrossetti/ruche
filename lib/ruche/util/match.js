// Module dependencies.
var debug = require('debug')('ruche:match');

/**
 * Match the lastest version of a package compatible with the user's plateform
 * @param  {Object} data     The ruche.json file
 * @param  {String} platform The user's plateform
 * @param  {String} package  Name of the package you want
 * @return {Object|false}    Return the info of the matched package. Otherwise
 *                           false is returned.
 */
var match = function match(data, platform, package) {
  var sort = data.sort(function(a,b) {
    return parseFloat(b.version) - parseFloat(a.version)
  });
  for (var i = 0; i < sort.length; i++) {
    if (sort[i].platform === platform) {
      debug('Match found for ' + sort[i].package + ': %j', sort[i]);
      return sort[i];
    }
  }
  debug('No match found for ' + package);
  return false;
}

module.exports = match;