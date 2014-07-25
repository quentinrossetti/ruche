'use strict';

module.exports = function (code, errOrigin) {

  var data = require('./errors.js');

  var err = {
    code: code,
    message: data[code].message,
    more: data[code].more
  };

  if (errOrigin) {
    err.origin = errOrigin;
  }

  return err;

};
