// Module dependencies.
var debug = require('debug')('ruche:register');
var rc = require('rc')('ruche');
var fs = require('fs');
var path = require('path');
var parser = require('./parser');
var error = require('./error');
var emitter = require('./emitter');

/**
 * Register all the binaries of a packages
 * @param {Object}  match The match from ruche.json
 * @param {Integer} l     The index of the current package in the list of 
 *                        packages you want.
 * @fires RucheEmitter#reg-start-i
 * @fires RucheEmitter#reg-done-i
 */
var register  = function (match, l) {
  emitter.emit('reg-start-' + l, match);
  var long = match.package + '-' + match.version + '-' + match.platform;
  var share = parser.untilde(rc.dir.share + '/' + match.package);
  var pathrc = parser.untilde(rc.dir.path);
  tar = parser.untilde(rc.dir.tmp + '/' + long + '.tar');
  
  // Write file (ex: bin.cmd)
  for (var bin in match.bin) {
    var file = path.resolve(pathrc + '/' + bin + '.cmd');
    var txt = '"' + share + '\\' + long + '\\' + match.bin[bin] + '" %*';
    fs.writeFile(file, txt, function () {
      debug('Registered to %PATH%: %s', match.bin[bin]);
      emitter.emit('reg-done-' + l, match);
    });
  }
};

module.exports = register;