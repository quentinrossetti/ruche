// Module dependencies
'use strict';
var debug = require('debug')('ruche');

// Find the best package to install
var match = function match(wanted, data) {

  function calcVersion(item) {
    var calc = '';
    /*jshint unused:false */
    item.split('.').forEach(function (v, i, r) {
      var toFill = 5 - v.length;
      calc += new Array(toFill).join('0') + v;
    });
    return parseInt(calc);
  }

  var dataByVersion = data.sort(function (a, b) {
    return calcVersion(b.version) - calcVersion(a.version);
  });

  var platform;
  if (process.env.PROCESSOR_ARCHITECTURE === 'AMD64') {
    platform = 'win64';
  }
  platform = wanted.platform || platform || 'win32';

  var version = wanted.version || dataByVersion[0].version;
  debug('search for v%s on %s', version, platform);

  var i;
  var c;
  var tmp = [];
  var len = dataByVersion.length;
  for (i = 0; i < len; i++) {
    c = dataByVersion[i];
    if (c.version === version && c.platform === platform) {
      tmp.push(c);
    }
  }
  if (tmp.length === 0) {
    tmp.push(dataByVersion[0]);
  }
  debug('Match %s-%s-%s', c.package, c.version, c.platform);
  return tmp[0];
};

module.exports = match;
