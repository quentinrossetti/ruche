// Module dependencies.
var debug = require('debug')('ruche:uninstall');
var rc = require('rc')('ruche');
var fs = require('fs');
var request = require('request');
var rimraf = require('rimraf');
var util = require('./util');

/**
 * Unistall a list of packages
 * @summary  Uninstall a list of packages
 * @memberOf Ruche
 * @param    {array} packages The list of packages you want to remove. This
 *           argument is an array of stings that could be either in a *short
 *           format*: `curl` or in a *long format*: `curl-7.36.0-win64`.
 * @param    {function} callback A callback function that is executed when all
 *           packages are removed. It gets two arguments `(err, data)` where
 *           `data` is a flat array of successfully removed packages (in
 *           *long format*: `curl-7.36.0-win64`).
 * @example
 * var ruche = require('ruche');
 * ruche.uninstall(['git', 'curl-7.35.0-win32'], function (err, data) {
 *   if (err) { // handle your error }
 *   console.dir(data); // [ 'git-1.9.4-win32', 'curl-7.35.0-win32' ]
 * });
 * @requires debug
 * @since    0.0.1
 * @license  [The MIT License (MIT)]{@link http://git.io/QMeU-w}
 */
var uninstall = function (packages, callback) {
  var i = 0;
  var i1 = -1;
  var i2 = -1;
  var wanted     = [];
  var repoUrl    = [];
  var repoOpts   = [];
  var repoData   = [];
  var repoReq    = [];
  var matches    = [];
  var long       = [];

  // List wanted packages
  for (i = 0; i < packages.length; i++) {
    wanted.push({
      package: packages[i].split('-')[0],
      version: packages[i].split('-')[1] || false,
      platform: packages[i].split('-')[2] || false,
    });
  }

  // Do uninstall
  for (i = 0; i < wanted.length; i++) {
    var repoUrl  = [];
    var repoOpts = [];
    var repoData = [];
    var repoReq  = [];
    var matches  = [];

    repoUrl[i] = rc.repository + '/' + wanted[i].package + '/ruche.json';
    repoOpts[i] = { url: repoUrl[i], json: true };
    repoReq[i] = request(repoOpts[i], function (err, res, data) {
      i1++;
      if (err || res.statusCode !== 200) {
        callback(new Error('Can\'t reach %s', repoUrl[i1]), undefined);
        return;
      }
      repoData[i1] = data;
      debug('ruche.json file acquired: %s', packages[i1]);
      matches[i1] = util.match(wanted[i1], repoData[i1]);
      long[i1]  = matches[i1].package + '-';
      long[i1] += matches[i1].version + '-';
      long[i1] += matches[i1].platform;
      util.remove(matches[i1], i1, function () {
        i2++;
        if (i2 + 1 === wanted.length) {
          callback(undefined, long);
        }
      });
    });
  }
};

module.exports = uninstall;
