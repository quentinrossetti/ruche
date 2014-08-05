'use strict';

var tmpProcessPlatform;

module.exports.defaultProcessPlatform = function () {
  tmpProcessPlatform = process.platform;
  process.platform = '?';
};

module.exports.restoreProcessPlatform = function () {
  process.platform = tmpProcessPlatform;
};

module.exports.getCacheStandard = function () {
  return require('./acme.json');
};
