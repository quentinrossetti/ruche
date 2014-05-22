// Module dependencies.
var debug = require('debug')('ruche:emitter');
var emitter = require('events').EventEmitter;
var _ = require('underscore');

/**
 * A internal EventEmitter 
 * @return {*}
 */
function internalEmitter() {
  // Nothing to do
}

// Makes an EventEmitter of emitter
_.extend(internalEmitter, new emitter());

module.exports = internalEmitter;