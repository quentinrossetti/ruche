// Module dependencies
var debug   = require('debug')('ruche:install');
var rc      = require('rc')('ruche');
var request = require('request');
var emitter = require('./util/emitter');
var error   = require('./util/error');

/**
 * Install a list of new packages. It reads the
 * @summary  Install a list of new packages
 * @memberOf Ruche
 * @param    {array} packages The list of packages you want to install. This
 *           argument is an array of stings that could be either in a *short
 *           format*: `curl` or in a *long format*: `curl-7.36.0-win64`.
 * @param    {function} callback A callback function that is executed when all
 *           packages are installed. It gets two arguments `(err, data)` where
 *           `data` is a flat array of successfully installed packages (in
 *           *long format*: `curl-7.36.0-win64`).
 * @example
 * var ruche = require('ruche');
 * ruche.install(['git', 'curl-7.35.0-win32'], function (err, data) {
 *   if (err) { // handle your error }
 *   console.dir(data); // [ 'git-1.9.4-win32', 'curl-7.35.0-win32' ]
 * });
 * @requires debug
 * @since    0.0.1
 * @license  [The MIT License (MIT)]{@link http://git.io/QMeU-w}
 */
var install = function (packages, callback) {
  var wanted = [], j = -1, k = -1, l = -1;

  // List wanted packages
  for (var i = 0; i < packages.length; i++) {
    wanted.push({
      package: packages[i].split('-')[0],
      version: packages[i].split('-')[1] || false,
      platform: packages[i].split('-')[2] || false,
    });
  }

  // Do install
  for (var i = 0; i < wanted.length; i++) {
    var repoUrl = {}
      , repoOpts = {}
      , repoData = {}
      , repoReq = {}
      , repoMatch = {};

    repoUrl[i] = rc.sources.repository + wanted[i].package + '/ruche.json';
    repoOpts = { url: repoUrl[i], json: true };
    repoReq[i] = request(repoOpts, function (err, res, data) {
      j++;
      if (err) { error.handle(err); }
      repoData[j] = data;
      debug('ruche.json file acquired: %s', packages[j]);

      // Match wanted against the ruche.json file.
      repoMatch[j] = require('./util/match')(wanted[j], repoData[j]);

      // Extract
      emitter.on('dl-done-' + j, function () {
        k++;
        require('./util/extract')(repoMatch[k], k);

        // Register
        emitter.on('tar-done-' + k, function () {
          l++
          require('./util/register')(repoMatch[l], l);
        });
      });

      // Download
      require('./util/download')(repoMatch[j], j);
    });
  }
};

module.exports = install;
