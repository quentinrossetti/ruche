// Module dependencies
'use strict';
var colors = require('colors');

// Display an error.
var error = function (err) {
  var r = 'Error: '.red + err.message;
  console.log(r);
  return r;
};

module.exports = error;
