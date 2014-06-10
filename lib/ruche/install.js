// Module dependencies.
var debug = require('debug')('ruche:install');
var rc = require('rc')('ruche');
var request = require('request');
var emitter = require('./util/emitter');
var error = require('./util/error');

/**
 * Install a ruche package.
 * @param  {Array} packages List of the packages you want
 */
var install = function (packages) {
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

    repoUrl[i] = rc.sources.repository + '/' + wanted[i].package + '/ruche.json';
    repoOpts[i] = { url: repoUrl[i], json: true };
    repoReq[i] = request(repoOpts[i], function (err, res, data) {
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