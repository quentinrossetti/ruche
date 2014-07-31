'use strict';
var fs     = require('fs');
var path   = require('path');
var rimraf = require('rimraf');

module.exports.before = function () {

  var testDir = path.resolve(__dirname, '../../.test');
  fs.mkdirSync(testDir);
  var rc = {
    repository: 'http://localhost:42001/',
    dir       : {
      'bin'   : '/bin',
      'etc'   : '/etc',
      'share' : '/share',
      'tmp'   : '/tmp',
      'var'   : '/var',
      'db'    : '/var/db',
      'run'   : '/var/run',
      'www'   : '/var/www'
    },
    cache     : {
      time    : 0
    },
    software : {
      stable  : false
    }
  };
  Object.keys(rc.dir).forEach(function (key) {
    rc.dir[key] = path.resolve(__dirname, '../../.test/' + rc.dir[key]);
    fs.mkdirSync(rc.dir[key]);
  });
  process.rc = rc;
  return;

};

module.exports.after = function () {

  var testDir = path.resolve(__dirname, '../../.test');
  rimraf.sync(testDir);
  return;

};
