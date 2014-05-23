// Module dependencies.
var debug = require('debug')('ruche:version');
var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var emitter = require('./util/emitter');
var error = require('./util/error');

/**
 * Show the version number.
 * @fires RucheEmitter#version
 */
var version =  function () {
  var file = path.resolve(__dirname + '../../../package.json');
  fs.readFile(file, { encoding: 'utf8'}, function (err, data) {
    if (err) { error.handle(err) };
    try {
      data = JSON.parse(data)
    } catch (err) {
      error.handle(err)
    }
    data = 'v' + data.version;
    debug('ruche version called: ' + data);
    emitter.emit('version', data);
  });
};

module.exports = version;