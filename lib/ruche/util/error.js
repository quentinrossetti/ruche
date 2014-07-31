'use strict';

/*
 * Custom Ruche error
 */
function RucheError(code, errOrigin) {

  this.name = 'RucheError';

  var data = require('./errors.js');

  // Error code not found
  if (data[code] === undefined) {
    code = 100;
  }

  // Populate the error
  this.code    = code;
  this.message = data[code].message;
  this.more    = data[code].more;

  // When an origin error is given
  if (errOrigin) {
    this.origin           = {};
    this.origin.type      = errOrigin.type || null;
    this.origin.message   = errOrigin.message;
    this.origin.stack     = errOrigin.stack.split('\n    ').splice(1, 10);
  }

}

RucheError.prototype = new Error();
RucheError.prototype.constructor = RucheError;

module.exports = RucheError;
