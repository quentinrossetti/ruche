// Module dependencies.
var debug = require('debug')('ruche:cli:help');
var emitter = require('../ruche/util/emitter');

emitter.on('help', function (data) {
  console.log(data);
});