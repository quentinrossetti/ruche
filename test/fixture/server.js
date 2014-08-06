'use strict';

var port = 42753;

module.exports.serve = function (callback) {

  var connect = require('connect');
  var serveStatic = require('serve-static');
  var app = connect();
  app.use(serveStatic('test/fixture/packages'));
  app.use(function(req, res, next) {
    if (req.url === '/error/ruche.json' || req.url === '/error/arch.tar.gz') {
      res.statusCode = 500;
      res.end('Error');
    }
    next();
  });
  app.listen(port, function () {
    callback();
  }).on('error', function () {
    callback();
  });

};
