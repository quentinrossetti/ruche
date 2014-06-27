// Module dependencies
'use strict';
var debug   = require('debug')('ruche');
var fs      = require('fs');
var http    = require('http');
var rc      = require('rc')('ruche');
var emitter = require('./emitter');
var untilde = require('./untilde');

// Download a package
var download = function (match, i, callback) {
  var e;
  var long = match.package + '-' + match.version + '-' + match.platform;
  var link = rc.repository + '/' + match.package + '/dist/' + long + '.tar.gz';

  var gzFile = untilde(rc.dir.tmp + '/' + long + '.tar.gz');
  var gzStream = fs.createWriteStream(gzFile);

  // Make an HTTP request to get the file
  var req = http.get(link, function (res) {
    if (res.statusCode >= 400) {
      e = new Error('Unaccessible URI');
    }
    res.pipe(gzStream);
    gzStream.on('finish', function () {
      gzStream.close(function () {
        debug('Written to file sytsem: %s.tar.gz', long);
        emitter.emit('dl-done-' + i);
        callback(e, gzFile);
      });
    });
  });

  // Capture the HTTP response
  req.on('response', function (res) {
    var contentLength = parseInt(res.headers['content-length'], 10);
    emitter.emit('dl-start-' + i, contentLength);

    // When receiving data (chunk by chunk)
    res.on('data', function (chunk) {
      emitter.emit('dl-data-' + i, chunk);
    });

  });

};

module.exports = download;
