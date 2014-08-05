'use strict';
var _       = require('underscore');
var fs      = require('fs');
var path    = require('path');
var http    = require('http');
var request = require('request');
var u       = {
  cache: require('./cache'),
  error: require('./error'),
  event: require('./event')
};

/**
 * Download and cache a ruche.json file.
 * @param software_name [string] Wished software name.
 * @param callback [function] Executed when done.
 */
module.exports.json = function (software_name, callback) {

  var repo = process.rc.repository;
  if (repo.substr(repo.length - 1) !== '/') { repo += '/'; }
  var url = repo + software_name + '/ruche.json';

  request(url, function (err, res, body) {

    if (err) {
      // Can't reach URL
      callback(new u.error(110, err, { url: url }), null);
      return;
    }

    if (res.statusCode >= 500) {
      // Can't reach URL
      callback(new u.error(110, err, { url: url }), null);
      return;
    }

    if (res.statusCode >= 400) {
      // Software not found
      callback(new u.error(230, err, {
        software: { name: software_name }
      }), null);
      return;
    }

    var cache;
    try {
      cache = JSON.parse(body);
    } catch (errParse) {
      // Can't parse JSON file
      callback(new u.error(211, errParse, { json: body }), null);
      return;
    }

    var file = path.resolve(process.rc.dir.tmp + '/' + software_name + '.json');
    try {
      fs.writeFileSync(file, body);
    } catch (errSave) {
      // Can't save file
      callback(new u.error(212, errSave, { file: file }), null);
      return;
    }

    callback(null, cache);

  });

};

/**
 * Download and cache an archive.
 * @param task_index [number] Position of the task in the `process.tasks` array.
 * @param callback [function] Executed when done.
 */
module.exports.archive = function (task_index, callback) {

  var task = process.tasks[task_index];

  var chunks = [];
  http.get(task.match.link, function (res) {

    if (res.statusCode >= 500) {
      // Can't reach URL
      callback(new u.error(110, null, { url: task.match.link }), null);
      return;
    }

    if (res.statusCode >= 400) {
      // Unable to access URL
      callback(new u.error(111, null, { url: task.match.link }), null);
      return;
    }

    var contentLength = parseInt(res.headers['content-length']);
    process.tasks[task_index].dlSize = contentLength;
    u.event.emit('dl-start', task_index, contentLength);

    res.on('data', function (chunk) {
      u.event.emit('dl-data', task_index, chunk.length);
      chunks.push(chunk);
    });

    // Create file
    var fileName   = _.last(task.match.link.split('/'));
    var filePath   = path.resolve(process.rc.dir.tmp, fileName);
    var fileStream = fs.createWriteStream(filePath);
    res.pipe(fileStream);
    fileStream.on('finish', function () {
      fileStream.close(function () {
        u.event.emit('dl-end', task_index);
        callback(null, filePath);
      });
    });

  });

};
