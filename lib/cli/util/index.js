// Module dependencies
'use strict';
var debug = require('debug')('ruche');

/**
 * @namespace CliUtil
 */
var CliUtil = {
  argv  : require('./argv'),
  error : require('./error'),
};

debug('CliUtil namespace created.');

module.exports = CliUtil;
