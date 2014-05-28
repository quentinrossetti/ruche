// Module dependencies.
var debug = require('debug')('ruche:download');
var http = require('http');
var path = require('path');
var fs = require('fs');
var _ = require('underscore');
var error = require('./error');
var emitter = require('./emitter');

/**
 * Get a file from HTTP request and save it to the local file system.
 * @param {Object}   match  Package match in ruche.json
 * @param {String}   dest   Destination file on the file system
 * @fires RucheEmitter#install-fail
 * @fires RucheEmitter#install-package-response
 * @fires RucheEmitter#install-package-chunk
 * @fires RucheEmitter#install-package-dl
 * @fires RucheEmitter#install-package-file
 */
var download = function(match, dest) {
  
  // Open a file stream
  debug('Create a stream: ' + dest);
  var file = fs.createWriteStream(dest);

  if (match.link.charAt(4) === 's') {
    http = require('https');
  }
  
  // Make an HTTP request to get the file
  debug('HTTP request to: ' + match.link);
  var req = http.get(match.link, function(res) {
    res.pipe(file);
    file.on('finish', function() {
      file.close(function (data) {
        emitter.emit('install-' + match.package + '-dl-done', data);
        debug('Written to file sytsem: ' + match.package);
      });
    });
  });

  // Capture the HTTP response
  req.on('response', function (res) {
    var contentLength = parseInt(res.headers['content-length'], 10);
    emitter.emit('install-' + match.package + '-dl-res', contentLength);
    
    // When receiving data (chunk by chunk)
    res.on('data', function (chunk) {
      emitter.emit('install-' + match.package + '-dl-chunk', chunk);
    });
  })

  // If there is an error handle it
  req.on('error', function(err) {
    fs.unlink(dest);
    error.handle(err);
  });
};

module.exports = download;