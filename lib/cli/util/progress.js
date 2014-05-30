// Module dependencies.
var debug = require('debug')('ruche:cli:progress');
var progress = require('progress');
var humanize = require('humanize');
var colors = require('colors');
var emitter = require('../../../lib/ruche/util/emitter');

/**
 * Stdout a nice progress bar
 * @param  {String}  package The name of the package the bar is about
 * @param  {String}  phase   The phase in the overhaul process (dl/pack...)
 */
var main =  function (phase, j) {
  emitter.on(phase + '-start-' + j, function (length) {
    var look = ' [:bar] :percent :etas ' + humanize.filesize(length);
    if (phase === 'dl') {
      look += ' Download ' + package
    } else if (phase === 'gz') {
      look += ' Uncompress ' + package
    }
    var bar = new progress(look.grey, {
      complete: '=',
      incomplete: ' ',
      width: 8,
      total: length
    });
    emitter.on(phase + '-data-' + j, function (chunk) {
      bar.tick(chunk.length);
    });
  });
};

module.exports = main;