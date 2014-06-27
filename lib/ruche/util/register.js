// Module dependencies
'use strict';
var debug   = require('debug')('ruche');
var fs      = require('fs');
var path    = require('path');
var rc      = require('rc')('ruche');
var emitter = require('./emitter');
var untilde = require('./untilde');

// Register all the binaries of a packages
var register  = function (match, l, callback) {

  if (match.bin === undefined) {
    callback(null);
    return;
  }

  var long = match.package + '-' + match.version + '-' + match.platform;
  var share = untilde(rc.dir.share + '/' + match.package);
  var pathrc = untilde(rc.dir.path);

  emitter.on('reg-data-' + l, function (chunk) {
    if (chunk + 1 === Object.keys(match.bin).length) {
      emitter.emit('reg-done-' + l);
      callback(binaries);
    }
  });

  var file;
  var txt;
  var binaries = {};
  var chunk = -1;
  for (var bin in match.bin) {
    chunk++;
    file = path.resolve(pathrc + '/' + bin + '.cmd');
    txt  = '@echo off\n';
    txt += '"' + share + '\\' + long + '\\' + match.bin[bin] + '" %*';
    binaries[bin] = file;
    fs.writeFileSync(file, txt);
    debug('Registered to %PATH%: %s', match.bin[bin]);
    emitter.emit('reg-data-' + l, chunk);
  }

};

module.exports = register;
