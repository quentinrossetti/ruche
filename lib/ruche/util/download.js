// Module dependencies.
var debug = require('debug')('ruche:download');
var rc = require('rc')('ruche');
var http = require('http');
var path = require('path');
var fs = require('fs');
var _ = require('underscore');
var error = require('./error');
var emitter = require('./emitter');
var parser = require('./parser');

/**
 * Download a package
 * @param {Object}  match The match from ruche.json
 * @param {Integer} j     The index of the current package in the list of 
 *                        packages you want.
 * @fires RucheEmitter#dl-start-i
 * @fires RucheEmitter#dl-data-i
 * @fires RucheEmitter#dl-done-i
 */
var download = function (match, j) {
  
  var long = match.package + '-' + match.version + '-' + match.platform;

  var gzFile = parser.untilde(rc.dir.tmp + '/' + long + '.tar.gz');
  var gzStream = fs.createWriteStream(gzFile);

  // Make an HTTP request to get the file
  var req = http.get(match.link, function(res) {
    res.pipe(gzStream);
    gzStream.on('finish', function() {
      gzStream.close(function (data) {
        debug('Written to file sytsem: %s.tar.gz', long);
        emitter.emit('dl-done-' + j); 
      });
    });
  });

  // Capture the HTTP response
  req.on('response', function (res) {
    var contentLength = parseInt(res.headers['content-length'], 10);
    emitter.emit('dl-start-' + j, match, contentLength);
    
    // When receiving data (chunk by chunk)
    res.on('data', function (chunk) {
      emitter.emit('dl-data-' + j, chunk);
    });
  })

  // If there is an error handle it
  req.on('error', function(err) {
    fs.unlink(gzFile);
    error.handle(err);
  });
};

module.exports = download;