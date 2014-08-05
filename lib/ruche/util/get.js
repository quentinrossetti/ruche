'use strict';
var fs      = require('fs');
var path    = require('path');
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
    return;

  });

};

/**
 * Download and cache an archive.
 * @param task_index [number] Position of the task in the `process.tasks` array.
 * @param callback [function] Executed when done.
 */
module.exports.archive = function (task_index, callback) {

  var task = process.tasks[task_index];


};
