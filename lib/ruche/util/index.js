// Module dependencies
'use strict';
var debug = require('debug')('ruche');

/**
 * @namespace RucheUtil
 */
var RucheUtil = {
  download : require('./download'),
  emitter  : require('./emitter'),
  error    : require('./error'),
  match    : require('./match'),
  untilde  : require('./untilde'),
  register : require('./register'),
  valid    : require('./valid'),
};

debug('RucheUtil namespace created.');

module.exports = RucheUtil;
