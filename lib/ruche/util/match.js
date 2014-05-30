// Module dependencies.
var debug = require('debug')('ruche:match');
var _ = require('underscore');
var error = require('./error');

/**
 * Match the lastest version of a package compatible with the user's platform
 * @param  {Object} wanted   Package and spec you want
 * @param  {Object} data     The ruche.json file
 * @return {Object|false}    Return the info of the matched package. Otherwise
 *                           false is returned.
 */
var match = function match(wanted, data) {
  
  // Sort ruche.json by version. The lastest version is first in the returned 
  // object. If there is several files of the same version (ex: differents 
  // platform) the order of the ruche.json file is conserved.
  var dataByVersion = data.sort(function(a,b) {
    return parseFloat(b.version) - parseFloat(a.version)
  });

  // No version and no platform specified
  if (wanted.version === false && wanted.platform === false) {
    var platform = 'win' + process.env.architecture;
    for (var i = 0; i < dataByVersion.length; i++) {
      var c = dataByVersion[i];
      if (c.platform === platform) {
        debug('Match found: %s-%s-%s', c.package, c.version, c.platform);
        return c;
      } 
    }
    var c = dataByVersion[0]
    debug('Match found: %s-%s-%s', c.package, c.version, c.platform);
    return c;
  
  // Version and platform specified
  } else if (wanted.version !== false && wanted.platform !== false) {
    for (var i = 0; i < dataByVersion.length; i++) {
      var c = dataByVersion[i];
      if (c.version === wanted.version && c.platform === wanted.platform) {
        debug('Match found: %s-%s-%s', c.package, c.version, c.platform);
        return c;
      }
    }
  }

  // Otherwise or no match
  error.handle(new Error('No match found'));
}

module.exports = match;