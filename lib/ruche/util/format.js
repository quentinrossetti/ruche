'use strict';

module.exports = function (software) {

  var regex = /^(\w+)-?([\.\d]+[a-z]*)?-?(\w+)?-?(\w+)?$/;
  var result = regex.exec(software);

  if (!result) {
    return null;
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
