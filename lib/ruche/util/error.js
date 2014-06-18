// Module dependencies
'use strict';
var debug   = require('debug')('ruche');
var emitter = require('./emitter');

/**
 * It is never a good idea to let a process continue on unknown error. This
 * function helps you handling this situation by emitting an `error` event.
 * @summary  uncaughtException handler
 * @memberOf RucheUtil
 * @example
 * var error = require('./lib/ruche/util/error');
 * error();
 * @fires    RucheUtil#error
 * @requires debug
 * @since    0.0.1
 * @license  [The MIT License (MIT)]{@link http://git.io/QMeU-w}
 */
var error = function () {
  /**
   * Emitted when an uncaughtException occurs.
   * @event RucheUtil#error
   * @type  {object}
   * @see   RucheUtil.error
   */
  emitter.on('error', function (err) {
    debug(err.stack);
  });
};

module.exports = error;
