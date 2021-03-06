// Module dependencies
'use strict';
var debug   = require('debug')('ruche');
var rc      = require('rc')('ruche');
var request = require('request');
var util    = require('./util');

// Install a list of new packages
var install = function (packages, callback) {
  var i  = 0;
  var i1 = -1;
  var i2 = -1;
  var i3 = -1;
  var i4 = -1;
  var wanted     = [];
  var repoUrl    = [];
  var repoOpts   = [];
  var repoData   = [];
  var repoReq    = [];
  var matches    = [];
  var locations  = [];
  var registered = [];
  var long       = [];

  // List wanted packages
  for (i = 0; i < packages.length; i++) {
    wanted.push({
      package: packages[i].split('-')[0],
      version: packages[i].split('-')[1] || false,
      platform: packages[i].split('-')[2] || false,
    });
  }

  // Do install
  for (i = 0; i < wanted.length; i++) {

    repoUrl[i] = rc.repository + '/' + wanted[i].package + '/ruche.json';
    repoOpts = { url: repoUrl[i], json: true };
    repoReq[i] = request(repoOpts, function (err, res, data) {
      i1++;
      if (err || res.statusCode !== 200) {
        callback(new Error('Can\'t reach URL: %s', repoUrl[i1]), undefined);
        return;
      }
      repoData[i1] = data;
      debug('ruche.json file acquired: %s', packages[i1]);
      matches[i1] = util.match(wanted[i1], repoData[i1]);
      long[i1]  = matches[i1].package + '-';
      long[i1] += matches[i1].version + '-';
      long[i1] += matches[i1].platform;

      util.emitter.emit('install-' + i1, matches[i1]);
      util.download(matches[i1], i1, function (err, location) {
        i2++;
        if (err) {
          callback(err, undefined);
          return;
        }
        locations[i2] = location;
        util.extract(matches[i2], i2, function (err, location) {
          i3++;
          if (err) {
            callback(err, undefined);
            return;
          }
          util.register(matches[i3], i3, function (binaries) {
            registered[i3] = binaries;
            i4++;
            if (i4 + 1 === wanted.length) {
              callback(undefined, long);
            }
          });
        });
      });
    });
  }
};

module.exports = install;
