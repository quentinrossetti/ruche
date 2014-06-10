// Module dependencies.
var debug = require('debug')('ruche:register');
var rc = require('rc')('ruche');
var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');
var parser = require('./parser');
var error = require('./error');
var emitter = require('./emitter');

/**
 * Unregister all the binaries of a packages
 * @param {Object}  match The match from ruche.json
 * @param {Integer} i     The index of the current package in the list of 
 *                        packages you want.
 * @fires RucheEmitter#unreg-start-i
 * @fires RucheEmitter#unreg-done-i
 */
var register  = function (match, i) {
  emitter.emit('unreg-start-' + i, match);
  var long = match.package + '-' + match.version + '-' + match.platform;
  var share = parser.untilde(rc.dir.share + '/' + match.package);
  var pathrc = parser.untilde(rc.dir.path);
  tar = parser.untilde(rc.dir.tmp + '/' + long + '.tar');
  
  // Delete file (ex: bin.cmd)
  for (var bin in match.bin) {
    var file = path.resolve(pathrc + '/' + bin + '.cmd');
    if (fs.existsSync(file)) {
      fs.unlink(file, function (err) {
        if (err) { error.handle(err); }
        debug('Unregistered file %s', file);
      });
    }    
  }

  // Delete share
  var shareFull = path.resolve(share + '/' + long)
  if (fs.existsSync(shareFull)) {
    rimraf(shareFull, function (err) {
      if (err) { error.handle(err); }
      debug('Delete folder %s', shareFull);
      emitter.emit('unreg-done-' + i, match);
    });
  }
};

module.exports = register;