// Module dependencies.
var debug = require('debug')('ruche:download');
var http = require('http');
var fs = require('fs');
var error = require('./error');
var emitter = require('./emitter');

/**
 * Get a file from HTTP request and save it to the local file system.
 * @param {String}   package  Name of the package
 * @param {String}   url      The HTTP URL of the file you want
 * @param {String}   dest     Destination file on the file system
 * @param {Object}   options  An object of options: port, etc.
 * @fires RucheEmitter#install-package-response
 * @fires RucheEmitter#install-package-chunk
 * @fires RucheEmitter#install-package-dl
 * @fires RucheEmitter#install-package-file
 */
var download = function(pakage, url, dest, options) {
  
  // Open a file stream
  var file = fs.createWriteStream(dest);
  
  // Make an HTTP request to get the file
  var req = http.get(url, function(res) {
    debug('Start of HTTP response: ' + package)
    res.pipe(file);
    file.on('finish', function() {
      file.close(function (data) {
        emitter.emit('install-' + package + '-file', data);
        debug('Written to file sytsem: ' + package);
      });
    });
  });

  // Capture the HTTP response
  req.on('response', function (res) {
    var contentLength = parseInt(res.headers['content-length'], 10)
    emitter.emit('install-' + package + '-response', contentLength);
    
    // When receiving data (chunk by chunk)
    res.on('data', function (chunk) {
      emitter.emit('install-' + package + '-chunk', chunk);
    });

    // When response ends
    res.on('end', function () {
      emitter.emit('install-' + package + '-dl');
      debug('End of HTTP response: ' + package);
    });
  })

  // If there is an error handle it
  req.on('error', function(err) {
    fs.unlink(dest);
    error.handle(err);
  });
};

module.exports = download;