// Module dependencies
'use strict';
var debug = require('debug')('ruche');
var fs    = require('fs');
var path  = require('path');

// Output the version number
var version = function (callback) {
  debug('ruche.version() called');
  var e;

  var file = path.resolve(__dirname, '../../package.json');
  fs.readFile(file, { encoding: 'utf8' }, function (err, data) {
    if (err) {
      e = new Error('Can\'t read the ruche package.json file');
      callback(e, undefined);
      return;
    }

    try {
      data = JSON.parse(data);
    } catch (err) {
      e = new Error('Can\'t parse the ruche package.json file');
    }

    callback(e, data.version);
  });

};

module.exports = version;
