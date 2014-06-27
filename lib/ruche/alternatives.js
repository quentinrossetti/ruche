// Module dependencies
'use strict';
var _       = require('underscore');
var debug   = require('debug')('ruche');
var fs      = require('fs');
var rc      = require('rc')('ruche');
var request = require('request');
var util    = require('./util');

// Switch between versions.
var alternatives = function (pack, callback) {

  var wanted = {
    package: pack.split('-')[0],
    version: pack.split('-')[1] || false,
    platform: pack.split('-')[2] || false,
  };
  var share = util.untilde(rc.dir.share + '/' + wanted.package);
  // Get local packages
  fs.readdir(share, function (err, files) {
    if (err) {
      callback(err, undefined);
      return;
    }
    util.emitter.emit('alt-show', files);

    util.emitter.on('alt-choice', function (answer) {
      // Get ruche.json file
      var repoUrl = rc.repository + '/' + wanted.package + '/ruche.json';
      var repoOpts = { url: repoUrl, json: true };
      request(repoOpts, function (err, res, data) {
        var find = util.match(wanted, data);
        util.register(find, 'alt', function (binaries) {
          debug('Alternative set to %s', answer);
          callback(undefined, files);
        });
      });
    });

    // Register the alternative directly if specified (no CLI prompt)
    if (pack.split('-').length === 3) {
      if(_.contains(files, pack)) {
        util.emitter.emit('alt-choice', pack);
      } else {
        callback(new Error('The version specified is not valid'), undefined);
        return;
      }
    } else {
      callback(undefined, files);
    }
  });
};

module.exports = alternatives;
