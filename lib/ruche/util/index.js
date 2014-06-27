// Module dependencies
'use strict';
var debug = require('debug')('ruche');

var RucheUtil = {
  download : require('./download'),
  emitter  : require('./emitter'),
  error    : require('./error'),
  extract  : require('./extract'),
  match    : require('./match'),
  untilde  : require('./untilde'),
  register : require('./register'),
  remove   : require('./remove'),
  valid    : require('./valid'),
};

debug('RucheUtil namespace created.');

module.exports = RucheUtil;
