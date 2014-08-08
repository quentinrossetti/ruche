'use strict';
var fs = require('fs');
var path = require('path');

module.exports.createJsonCache = function () {
  var copy = path.resolve(process.rc.dir.tmp, 'acme.json');
  var original  = path.resolve('test/fixture/packages/acme/ruche.json');
  fs.writeFileSync(copy, fs.readFileSync(original));
  process.rc.cache.time = 86400000;
};
