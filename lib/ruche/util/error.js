'use strict';

/**
 * Custom ruche error.
 * @param code [number] Error code identifier.
 * @param errOrigin [Error] Error object that originally trigger this error.
 * @param data [object] Additional data about the error.
 * @see {@link errors.js} For more the complete list of error codes.
 * @constructor
 */
function RucheError(code, errOrigin, data) {

  this.name = 'RucheError';

  var errors = require('./errors.js');

  // Error code not found
  if (errors[code] === undefined) {
    code = 100;
    this.data = { invalidCode: code };
  }

  // Populate the error
  this.code    = code;
  this.message = errors[code].message;
  this.more    = errors[code].more;

  // Add property of the origin error
  if (errOrigin) {
    this.origin           = {};
    this.origin.type      = errOrigin.type || null;
    this.origin.message   = errOrigin.message;
    this.origin.stack     = errOrigin.stack.split('\n    ').splice(1, 10);
  }

  // Additional data
  if (data && code !== 100) {
    this.data = data;
  }

}

RucheError.prototype = new Error();
RucheError.prototype.constructor = RucheError;

module.exports = RucheError;
