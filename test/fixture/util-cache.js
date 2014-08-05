'use strict';
var fs = require('fs');
var path = require('path');

var tmpRcCacheTime;

module.exports.createCache = function () {
  var cacheOriginal = path.resolve(process.rc.dir.tmp, 'acme.json');
  var cacheFixture  = path.resolve(__dirname, 'acme.json');
  fs.writeFileSync(cacheOriginal, fs.readFileSync(cacheFixture));
};

module.exports.createCorruptCache = function () {
  var cacheOriginal  = path.resolve(process.rc.dir.tmp, 'acme.json');
  var cacheCorrupted = path.resolve(__dirname, 'corrupt.json');
  fs.writeFileSync(cacheOriginal, fs.readFileSync(cacheCorrupted));
};

module.exports.deleteCorruptCache = function () {
  var cacheFile = path.resolve(process.rc.dir.tmp, 'acme.json');
  fs.unlinkSync(cacheFile);
};

module.exports.protectFromStaleCache = function () {
  tmpRcCacheTime = process.rc.cache.time;
  process.rc.cache.time = 86400000; // One day
};

module.exports.exposeFromStaleCache = function () {
  process.rc.cache.time = tmpRcCacheTime;
};

module.exports.createTask = function () {
  return {
    name: 'acme',
    match: {
      name: 'acme',
      version: '0.0.1',
      platform: 'linux32',
      link: 'http://localhost:42753/acme/acme_0_0_1-mswinx64.zip'
    }
  };
};

module.exports.createJson = function () {
  var fileTmp = path.resolve(process.rc.dir.tmp + '/acme.json');
  var fileTest = path.resolve(__dirname + '/acme.json');
  fs.createReadStream(fileTest).pipe(fs.createWriteStream(fileTmp));
};

module.exports.removeJson = function () {
  var filePath = path.resolve(process.rc.dir.tmp + '/acme.json');
  fs.unlinkSync(filePath);
};

module.exports.createArchive = function () {
  var filePath = path.resolve(process.rc.dir.tmp + '/acme_0_0_1-mswinx64.zip');
  fs.writeFileSync(filePath, 'acme archive v0.0.1 on linux32');
};

module.exports.removeArchive = function () {
  var filePath = path.resolve(process.rc.dir.tmp + '/acme_0_0_1-mswinx64.zip');
  fs.unlinkSync(filePath);
};
