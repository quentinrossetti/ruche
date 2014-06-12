var emitter = require('../../ruche/util/emitter');
var colors = require('colors');

var handle = function (err) {
  console.log('Error: '.red + err.message);
};

module.exports.handle = handle;