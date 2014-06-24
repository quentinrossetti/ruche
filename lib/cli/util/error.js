var emitter = require('../../ruche/util/emitter');
var colors = require('colors');

var error = function (err) {
  var r = 'Error: '.red + err.message;
  console.log(r);
  return r;
};

module.exports = error;
