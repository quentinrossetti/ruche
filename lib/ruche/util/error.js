// Module dependencies
'use strict';
var debug   = require('debug')('ruche:error');
var emitter = require('./emitter');

/**
 * It is never a good idea to let a process continue on unknown error. This
 * function handle this situation by emitting an `error` event and exiting the
 * process with `1` as error code.
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
  process.on('uncaughtException', function (err) {
    /**
     * Emitted when an uncaughtException occurs.
     * @event RucheUtil#error
     * @type  {object}
     * @see   RucheUtil.error
     */
    emitter.emit('error', err);
    debug(err.stack);
    process.exit(1)
  });
}

module.exports = error;
