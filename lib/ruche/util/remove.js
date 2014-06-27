// Module dependencies
'use strict';
var debug   = require('debug')('ruche');
var fs      = require('fs');
var rc      = require('rc')('ruche');
var rimraf  = require('rimraf');
var emitter = require('./emitter');
var untilde = require('./untilde');

// Unregister all the binaries of a packages and remove files
var remove = function (match, i, callback) {

  emitter.emit('unreg-start-' + i);
  var long = match.package + '-' + match.version + '-' + match.platform;
  var binPath;

  // Remove binaries
  if (match.bin !== undefined) {
    for (var bin in match.bin) {
      binPath = untilde(rc.dir.path + '/' + bin + '.cmd');
      if (fs.existsSync(binPath)) {
        fs.unlinkSync(binPath);
      }
    }
    debug('Remove binaries aliases');
  }

  // Remove share
  var shareLong = untilde(rc.dir.share + '/' + match.package + '/' + long);
  var sharePack = untilde(rc.dir.share + '/' + match.package);
  rimraf.sync(shareLong);
  if (fs.readdirSync(sharePack).length === 0) {
    rimraf.sync(sharePack);
  }

  // Remove etc
  var etc = untilde(rc.dir.config + '/' + match.package);
  if (fs.existsSync(etc)) {
    rimraf.sync(etc);
    debug('Remove configuration');
  }

  debug('Remove all files');
  emitter.emit('unreg-done-' + i);
  callback();
};

module.exports = remove;
