'use strict';

/*
 * Generate an error.
 */
module.exports = function (code, errOrigin) {

  // Private error composer
  function _composeError(data, code) {
    return {
      code: code,
      message: data[code].message,
      more: data[code].more
    };
  }

  var data = require('./errors.js');

  // Error code not found
  if (data[code] === undefined) {
    return _composeError(data, 100);
  }

  // Populate the error
  var err = _composeError(data, code);

  // When an origin error is given
  if (errOrigin) {
    err.origin           = {};
    err.origin.type      = errOrigin.type || null;
    err.origin.message   = errOrigin.message;
    err.origin.arguments = errOrigin.arguments || null;
    err.origin.stack     = errOrigin.stack.split('\n    ').splice(1, 10);
  }

  return err;

};
