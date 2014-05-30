// Module dependencies.
var debug = require('debug')('ruche:cli:install');
var progress = require('progress');
var humanize = require('humanize');
var colors = require('colors');
var download = require('../../lib/ruche/util/download');
var emitter = require('../../lib/ruche/util/emitter');

var install = function (argv) {
  var color = {}, dli = -1, gzi = -1, tari = -1, regi = -1, donei = -1;
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
    
    emitter.on('dl-start-' + i, function (match, length) {
      dli++;
      var c = 'c' + dli;
      var long = match.package + '-' + match.version + '-' + match.package;
      console.log('Downloading %s %s...', long[c], humanize.filesize(length));
    });
    // emitter.on('gz-start-' + i, function (match, length) {
    //   gzi++;
    //   var c = 'c' + gzi;
    //   var long = match.package + '-' + match.version + '-' + match.package;
    //   console.log('Uncompress %s %s...', long[c], humanize.filesize(length));
    // });
    emitter.on('tar-start-' + i, function (match, length) {
      tari++;
      var c = 'c' + tari;
      var long = match.package + '-' + match.version + '-' + match.package;
      console.log('Copying %s %s...', long[c], humanize.filesize(length));
    });
    // emitter.on('reg-start-' + i, function (match) {
    //   regi++;
    //   var c = 'c' + regi;
    //   var long = match.package + '-' + match.version + '-' + match.package;
    //   console.log('Registering %s...', long[c]);
    // });
    emitter.on('reg-done-' + i, function (match) {
      donei++;
      var c = 'c' + donei;
      var long = match.package + '-' + match.version + '-' + match.package;
      console.log('Installation of %s done!', long[c]);
    });

  }
};

module.exports = install;