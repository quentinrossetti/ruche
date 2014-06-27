// Module dependencies
'use strict';
var _           = require('underscore');
var debug       = require('debug')('ruche');
var nodeEmitter = require('events').EventEmitter;

// Internal EventEmitter
var emitter = function () {};

// Makes an EventEmitter of emitter
_.extend(emitter, new nodeEmitter());
debug('Internal event emitter created');

module.exports = emitter;
