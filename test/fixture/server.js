// Module dependencies
'use strict';
var debug = require('debug')('ruche:test:fixture');
var http  = require('http');
var fs    = require('fs');

/**
 * Fixture: HTTP server that serve static files under `test/fixtures`
 */
var before = function () {
  http.createServer(function (req, res) {
    fs.readFile(__dirname + req.url, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  }).listen(42002, function () {
    debug('HTTP server that serve static files under `test/fixtures`');
  });
};

module.exports.before = before;
