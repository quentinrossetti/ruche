'use strict';
var fs   = require('fs');
var path = require('path');

var tmpRcCacheTime;
var tmpProcessPlatform;

module.exports.createCache = function () {

  var cacheOriginal = path.resolve(process.rc.dir.tmp, 'acme.json');
  var cacheFixture  = path.resolve(__dirname, 'acme.json');
  fs.writeFileSync(cacheOriginal, fs.readFileSync(cacheFixture));
  return;

};

module.exports.createCorruptCache = function () {

  var cacheOriginal  = path.resolve(process.rc.dir.tmp, 'acme.json');
  var cacheCorrupted = path.resolve(__dirname, 'corrupt.json');
  fs.writeFileSync(cacheOriginal, fs.readFileSync(cacheCorrupted));
  return;

};

module.exports.deleteCorruptCache = function () {

  var cacheFile = path.resolve(process.rc.dir.tmp, 'acme.json');
  fs.unlinkSync(cacheFile);
  return;

};

module.exports.protectFromStaleCache = function () {

  tmpRcCacheTime = process.rc.cache.time;
  process.rc.cache.time = 86400000; // One day
  return;

};

module.exports.exposeFromStaleCache = function () {

  process.rc.cache.time = tmpRcCacheTime;
  return;

};

module.exports.defaultProcessPlatform = function () {

  tmpProcessPlatform = process.platform;
  process.platform = '?';
  return;

};

module.exports.restoreProcessPlatform = function () {

  process.platform = tmpProcessPlatform;
  return;

};

module.exports.getCacheStandard = function () {

  return require('./acme.json');

};

