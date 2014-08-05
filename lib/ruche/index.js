'use strict';
var u = require('./util');

// Configuration
var rc = require('rc')('ruche', {
  repository: 'http://ruchejs.com/packages',
  dir       : {
    'bin'   : '~/.ruche/bin',
    'etc'   : '~/.ruche/etc',
    'share' : '~/.ruche/share',
    'tmp'   : '~/.ruche/tmp',
    'var'   : '~/.ruche/var',
    'db'    : '~/.ruche/var/db',
    'run'   : '~/.ruche/var/run',
    'www'   : '~/.ruche/var/www'
  },
  cache     : {
    time    : 86400000
  },
  software : {
    stable  : true
  }
});
Object.keys(rc.dir).forEach(function (key) {
  rc.dir[key] = u.format.untildify(rc.dir[key]);
});
process.rc = rc;

// Process variables
process.tasks = {};

module.exports = {

  install: require('./install'),
  version: require('./version')

};
