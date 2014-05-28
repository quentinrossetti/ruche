// Module dependencies.
var debug = require('debug')('ruche:cli:install');
var progress = require('progress');
var humanize = require('humanize');
var colors = require('colors');
var progress = require('./util/progress');
var download = require('../../lib/ruche/util/download');
var emitter = require('../../lib/ruche/util/emitter');

var install = function (packages) {

  for (var i = 0; i < packages.length; i++) {
    
    var package = packages[i].split('-');
    package = {
      package: package[0],
      version: package[1],
      platform: package[2]
    };
    var name = package.package;

    progress(name, 'dl');
    emitter.on('install-' + name + '-dl-done', function () {
      progress(name, 'gz');
      emitter.on('install-' + name + '-gz-done', function () {
        progress(name, 'tar');
      });
    });
    
    emitter.on('install-' + name + '-done', function (long) {
      console.log('Installation of ' + long.magenta + ' done!');
    });
  }

};

module.exports = install;