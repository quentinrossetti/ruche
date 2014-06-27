// Module dependencies
'use strict';
var debug   = require('debug')('ruche');
var rc      = require('rc')('ruche');
var request = require('request');
var util    = require('./util');

// Unistall a list of packages.
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

    repoUrl[i] = rc.repository + '/' + wanted[i].package + '/ruche.json';
    repoOpts[i] = { url: repoUrl[i], json: true };
    repoReq[i] = request(repoOpts[i], function (err, res, data) {
      i1++;
      if (err || res.statusCode !== 200) {
        callback(new Error('Can\'t reach URL: %s', repoUrl[i1]), undefined);
        return;
      }
      repoData[i1] = data;
      debug('ruche.json file acquired: %s', packages[i1]);
      matches[i1] = util.match(wanted[i1], repoData[i1]);

      util.emitter.emit('uninstall-' + i1, matches[i1]);
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
