// Module dependencies.
var debug = require('debug')('ruche:alternatives');
var rc = require('rc')('ruche');
var path = require('path');
var fs = require('fs');
var emitter = require('./util/emitter');
var error = require('./util/error');
var parser = require('./util/parser');

/**
 * Switch between versions.
 * @param  {String} package The package you want to manipulate
 */
var alternatives = function (package) {
  var list = [];
  var share = parser.untilde(rc.dir.share + '/' + package);
  fs.readdir(share, function (err, files) {
    if (err) { error.handle(err); }
    emitter.emit('alt-show', files); 
  });
};

module.exports = alternatives;