// Module dependencies
'use strict';
var debug = require('debug')('ruche');

/**
 * This function parse a `ruche.json`. Those files describes all the packages
 * available. By passing a `wanted` argument you choose the specifications of
 * the package you want.
 * @summary  Find the best package to install
 * @memberOf RucheUtil
 * @param    {object} wanted Package and spec you want. It's an object with
 *           at least one key `package`. Optionnals keys can be added:
 *           `version` and `platform`.
 * @param    {object} data The content of a `ruche.json` file.
 * @return   {object} Return the info of the best package.
 * @example
 * var rucheUtil = require('./lib/ruche/util');
 * var data = {}; // content of a ruche.json file
 * var match = rucheUtil.match({ package: 'curl' }, data);
 * @requires debug
 * @since    0.0.1
 * @license  [The MIT License (MIT)]{@link http://git.io/QMeU-w}
 */
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
  console.log('search for v%s on %s', version, platform);

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
  console.dir(tmp);
  debug('Match %s-%s-%s', c.package, c.version, c.platform);
  return tmp[0];
};

module.exports = match;
