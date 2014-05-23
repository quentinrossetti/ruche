// Module dependencies.
var debug = require('debug')('ruche:cli:install');
var progress = require('progress');
var humanize = require('humanize');
var download = require('../../lib/ruche/util/download');
var emitter = require('../../lib/ruche/util/emitter');

var package = {
  name: 'curl',
  link: 'http://www.paehl.com/open_source/?download=curl_736_0.zip'
};

download(package.link, package.name + '.zip', { package: package.name })

emitter.on('install-curl-response', function (len) {
  var look = package.name + ' [:bar] :percent :etas ' + humanize.filesize(len);
  var bar = new progress(look, {
    complete: '=',
    incomplete: ' ',
    width: 20,
    total: len
  });

  emitter.on('install-curl-chunk', function (chunk) {
    bar.tick(chunk.length);
  });

});