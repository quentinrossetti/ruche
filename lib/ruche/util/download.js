// Module dependencies.
var debug = require('debug')('ruche:download');
var http = require('http');
var https = require('https');
var path = require('path');
var fs = require('fs');
var progress = require('progress');
var colors = require('colors');
var humanize = require('humanize');
var error = require('./error');
var emitter = require('./emitter');

/**
 * Get a file from HTTP request and save it to the local file system.
 * @param {String}   url      The HTTP URL of the file you want
 * @param {String}   dest     Destination file on the file system
 * @param {Object}   options  An object of options: package, port, etc.
 * @fires RucheEmitter#install-package-response
 * @fires RucheEmitter#install-package-chunk
 * @fires RucheEmitter#install-package-dl
 * @fires RucheEmitter#install-package-file
 */
var download = function(url, dest, options) {
  
  // Open a file stream
  var file = fs.createWriteStream(dest);
  
  // Make an HTTP request to get the file
  var req = http.get(url, function(res) {
    debug('Start of HTTP response: ' + options.package)
    res.pipe(file);
    file.on('finish', function() {
      file.close(function (data) {
        emitter.emit('install-' + options.package + '-file', data);
        debug('Written to file sytsem: ' + options.package);
      });
    });
  });

  // Capture the HTTP response
  req.on('response', function (res) {
    var contentLength = parseInt(res.headers['content-length'], 10)
    emitter.emit('install-' + options.package + '-response', contentLength);

    res.on('data', function (chunk) {
      emitter.emit('install-' + options.package + '-chunk', chunk);
    });

    res.on('end', function () {
      emitter.emit('install-' + options.package + '-dl');
      debug('End of HTTP response: ' + options.package);
    });
  })

  req.on('error', function(err) {
    fs.unlink(dest);
    error.handle(err);
  });
};

module.exports = download;