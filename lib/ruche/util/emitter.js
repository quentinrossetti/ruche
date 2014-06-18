// Module dependencies
'use strict';
var debug       = require('debug')('ruche');
var nodeEmitter = require('events').EventEmitter;
var _           = require('underscore');

/**
 * Require this to get access to the *ruche specific events*. This inherits
 * directly from the node native class EventEmitter. The extends method in use
 * is the *Underscore.js* one.
 * @summary  Internal EventEmitter
 * @memberOf RucheUtil
 * @example
 * var rucheUtil = require('./lib/ruche/util');
 * rucheUtil.emitter.on('dl-start-0', function (length) {
 *   console.log('This download is %sB long', length);
 * });
 * @requires debug
 * @requires events
 * @requires underscore
 * @see      http://nodejs.org/api/events.html#events_class_events_eventemitter
 * @see      http://underscorejs.org/#extend
 * @since    0.0.1
 * @license  [The MIT License (MIT)]{@link http://git.io/QMeU-w}
 */
var emitter = function () {};

// Makes an EventEmitter of emit    ter
_.extend(emitter, new nodeEmitter());
debug('Internal event emitter created');

module.exports = emitter;
