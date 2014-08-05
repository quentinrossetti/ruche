'use strict';
var fs     = require('fs');
var path   = require('path');
var rimraf = require('rimraf');
var u      = require('../../lib/ruche/util');

module.exports.before = function () {

  var testDir = path.resolve(__dirname, '../../.test');
  // Delete previous test env
  if (fs.existsSync(testDir)) {
    rimraf.sync(testDir);
  }
  fs.mkdirSync(testDir);
  var rc = {
    repository: 'http://localhost:42753',
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
  process.rc    = rc;
  process.test  = {};
  process.tasks = [];
};

module.exports.after = function () {

  var testDir = path.resolve(__dirname, '../../.test');
  if (fs.existsSync(testDir)) {
    rimraf.sync(testDir);
  }

};

module.exports.beforeEach = function () {

  u.event.removeAllListeners();

};
