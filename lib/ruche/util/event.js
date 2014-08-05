'use strict';
var _           = require('underscore');
var nodeEmitter = require('events').EventEmitter;

// Internal EventEmitter
var emitter = {};

// Makes an EventEmitter of emitter
_.extend(emitter, new nodeEmitter());

module.exports = emitter;
