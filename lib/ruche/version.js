'use strict';
var fs   = require('fs');
var path = require('path');
var util = require('util');
var u    = require('./util');

/**
 * This function parse the package.json file of the current ruche installation
 * to read its version number.
 * @param callback [function] Executed when done.
 */
module.exports = function(callback) {

  var dataPath = path.resolve(__dirname, '../../package.json');

  fs.readFile(dataPath, function (errRead, dataBuffer) {

    if (errRead) {
      // Can't read JSON file
      callback(new u.error(210, errRead, { file: dataPath }), null);
      return;
    }

    var dataJson;
    try {
      dataJson = JSON.parse(dataBuffer).version;
    } catch (errCatch) {
      // Can't parse JSON file
      callback(new u.error(211, errCatch, { json: dataBuffer }), null);
      return;
    }

    var dataFormat = util.format('v%s', dataJson);
    callback(null, dataFormat);
    return;
  });

};
