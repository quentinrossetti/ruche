// Module dependencies.
var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/**
 * Show the version number.
 * @return {String}
 */
var version =  function () {
  var file = path.resolve(__dirname + '../../../package.json');
  var package = JSON.parse(fs.readFileSync(file));
  return package.version;
};

module.exports = version;