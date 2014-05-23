// Module dependencies.
var debug = require('debug')('ruche:cli:version');
var emitter = require('../ruche/util/emitter');

emitter.on('version', function (data) {
  console.log(data);
});