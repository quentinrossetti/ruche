// Module dependencies.
var debug = require('debug')('ruche:cli:alternatives');
var progress = require('progress');
var humanize = require('humanize');
var colors = require('colors');
var download = require('../../lib/ruche/util/download');
var emitter = require('../../lib/ruche/util/emitter');

var alternatives = function (argv) {
  emitter.on('alt-show', function (data) {
    console.log('Available alternatives for %s:', argv.package.cyan);
    for (var i = 0; i < data.length; i++) {
      console.log('[%s] %s', i, data[i]);
    }
  });
};

module.exports = alternatives;