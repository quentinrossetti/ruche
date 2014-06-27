// Module dependencies
'use strict';
var debug   = require('debug')('ruche');
var emitter = require('./emitter');

// uncaughtException handler
var error = function () {
  emitter.on('error', function (err) {
    debug(err.stack);
  });
};

module.exports = error;
