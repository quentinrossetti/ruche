// Module dependencies.
var debug = require('debug')('ruche:uninstall');
var rc = require('rc')('ruche');
var fs = require('fs');
var request = require('request');
var rimraf = require('rimraf');
var emitter = require('./util/emitter');
var error = require('./util/error');

/**
 * Uninstall a ruche package.
 * @param  {Array} packages List of the packages you want to delete
 */
var uninstall = function (packages) {
var wanted = [], j = -1, k = -1, l = -1;
  
  // List wanted packages
  for (var i = 0; i < packages.length; i++) {
    wanted.push({
      package: packages[i].split('-')[0],
      version: packages[i].split('-')[1] || false,
      platform: packages[i].split('-')[2] || false,
    });
  }

  // Do uninstall
  for (var i = 0; i < wanted.length; i++) {
    var repoUrl = {}
      , repoOpts = {}
      , repoData = {}
      , repoReq = {}
      , repoMatch = {};

    repoUrl[i] = rc.sources.repository + wanted[i].package + '/ruche.json';
    repoOpts[i] = { url: repoUrl[i], json: true };
    repoReq[i] = request(repoOpts[i], function (err, res, data) {
      j++;
      if (err) { error.handle(err); }
      repoData[j] = data;
      debug('ruche.json file acquired: %s', packages[j]);
      
      // Match wanted against the ruche.json file.
      repoMatch[j] = require('./util/match')(wanted[j], repoData[j]);

      // Unregister
      require('./util/unregister')(repoMatch[j], j);
    });
  }
};

module.exports = uninstall;