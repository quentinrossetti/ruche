'use strict';
var _ = require('underscore');
var path = require('path');
var fs = require('fs');
var ncp = require('ncp').ncp;
var unzip = require('unzip');

module.exports.zip = function (taskIndex, callback) {

  /*
  TODO: Implement function
   */

};

var ruche = require('..');

var match = {
  "name": "curl",
  "version": "7.37.0",
  "platform": "win64",
  "link": "http://www.confusedbycode.com/curl/curl-7.37.0-win64.zip",
  "archive": "zip",
  "share": "curl-7.37.0-win64",
  "bin": {
  "curl": "bin/curl.exe"
},
  "script": {
  "test": "cbc-test"
},
  "info": [
  "http://www.confusedbycode.com/curl/",
  "http://curl.haxx.se/",
  "http://wikipedia.org/wiki/CURL"
]
};
var task = {
  name: 'curl',
  match: match
};

var fileName   = _.last(task.match.link.split('/'));
var filePath   = path.resolve(process.rc.dir.tmp, fileName);
filePath   = path.resolve('C:/dev/test', fileName);
var rcSharePath = 'C:/dev/test/share/' + task.match.name + '/' + long;
var tmpPath = 'C:/dev/test';
var sizeDl = fs.statSync(filePath).size;
var unzipSt = unzip.Extract({ path: tmpPath });
var readSt = fs.createReadStream(filePath);
var size = 0;
readSt.on('data', function (chunk) {
  size += chunk.length;
}).on('end', function () {
  if (size !== sizeDl) {
    console.log('Unfinished business!');
    return;
  }
  console.log('Unzip done!');
  var zipSharePath = path.resolve(tmpPath, match.share);
//  mv(zipSharePath, rcSharePath, function (err) {
//    if (err) {
//      console.log('Error when mv');
//      console.dir(err);
//      return;
//    }
//    console.log('Move done!');
//  });
  ncp(zipSharePath, rcSharePath, function (err) {
    if (err) {
      return console.error(err);
    }
    console.log('done!');
  });
});
readSt.pipe(unzipSt);
