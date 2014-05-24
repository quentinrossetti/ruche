// Module dependencies.
var debug = require('debug')('ruche:cli:install');
var progress = require('progress');
var humanize = require('humanize');
var colors = require('colors');
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

    emitter.on('install-' + package.package + '-response', function (len) {
      debug('Listener for %s registered', package.package);
      var look = '  [:bar] :percent :etas ' + humanize.filesize(len);
      look += ' ' + package.package.green
      var bar = new progress(look, {
        complete: '=',
        incomplete: ' ',
        width: 20,
        total: len
      });

      emitter.on('install-' + package.package + '-chunk', function (chunk) {
        bar.tick(chunk.length);
      });

    });

  }


};

module.exports = install;