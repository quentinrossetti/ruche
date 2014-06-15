// Module dependencies
'use-strict';
/**
 * @namespace RucheUtil
 */
var RucheUtil = {
  download : require('./download'),
  emitter  : require('./emitter'),
  error    : require('./error'),
  match    : require('./match'),
  parser   : require('./parser'),
  register : require('./register'),
  valid    : require('./valid'),
};

debug('RucheUtil namespace created.');

module.exports = RucheUtil;
