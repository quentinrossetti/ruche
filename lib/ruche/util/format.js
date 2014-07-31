'use strict';
var u    = {
  error: require('./error')
};

/*
 * Format a software name in an useful object.
 */
module.exports.software = function (software) {

  var regex = /^(\w+)-?([\.\d]+[a-z\d]*)?-?(\w+)?-?(\w+)?$/;
  var result = regex.exec(software);

  if (!result) {
    throw new u.error(101);
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

/*
 * Untilde
 */
module.exports.untildify = function (string) {
  return require('untildify')(string);
};
