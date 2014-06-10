// Module dependencies.
var debug = require('debug')('ruche:uninstall');
var rc = require('rc')('ruche');
var fs = require('fs');
var rimraf = require('rimraf');
var emitter = require('./util/emitter');
var error = require('./util/error');
var parser = require('./util/parser');

/**
 * Uninstall a ruche package.
 * @param  {Array} packages List of the packages you want to delete
 */
var uninstall = function (packages) {
  for (var i = 0; i < packages.length; i++) {
    var ar = packages[i].split('-').length;
    debug(ar)
    var path = parser.untilde(rc.dir.share + '/' + packages[i]);
    fs.readdir(path, function (err, files) {
      debug(files);
      //rimraf(path, function () {
        
      //});
    });
    
  }
};

module.exports = uninstall;