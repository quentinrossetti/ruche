// Module dependencies.
var debug = require('debug')('ruche:cli:ununinstall');
var progress = require('progress');
var humanize = require('humanize');
var colors = require('colors');
var download = require('../../lib/ruche/util/download');
var emitter = require('../../lib/ruche/util/emitter');

var uninstall = function (argv) {
  var color = {}, donei = -1;
  colors.setTheme({
    'c0': 'cyan',
    'c1': 'magenta',
    'c2': 'green',
    'c3': 'blue',
    'c4': 'red',
    'c5': 'yellow'
  });

  var packages =  argv.packages;
  for (var i = 0; i < packages.length; i++) {
    
    emitter.on('unreg-done-' + i, function (match) {
      donei++;
      var c = 'c' + donei;
      var long = match.package + '-' + match.version + '-' + match.platform;
      console.log('Uninstallation of %s done!', long[c]);
    });

  }
};

module.exports = uninstall;