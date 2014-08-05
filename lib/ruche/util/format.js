'use strict';
var u    = {
  error: require('./error')
};

/**
 * Format the software wish into a more usable object.
 * @param software [string] The software wish provided by the user.
 * @returns {{
 *   name: string,
 *   version: (string|null),
 *   options: (string|null),
 *   platform: (string|null)
 * }}
 */
module.exports.software = function (software) {

  var regex = /^(\w+)-?([\.\d]+[a-z\d]*)?-?(\w+)?-?(\w+)?$/;
  var result = regex.exec(software);

  if (!result) {
    // Invalid software name format
    throw new u.error(101, null, { software: software });
  }

  var r = {
    name    : result[1],
    version : result[2] || null,
    options : result[3] || null,
    platform: result[4] || null
  };
  if (r.options !== null && r.platform === null) {
    r.platform = result[3];
    r.options  = null;
  }
  if (r.options) {
    r.options = r.options.split('_');
  }
  return r;

};

/**
 * Convert tilde-based path into valid path.
 * @param string
 * @returns {string}
 */
module.exports.untildify = function (string) {
  return require('untildify')(string);
};
