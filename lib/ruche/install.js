'use strict';
var async = require('async');
var u = require('./util');

/**
 * Install a list of new packages.
 * @param softwares [array] An array of wished software.
 * @param callback [function] Executed when done.
 */
module.exports = function (softwares, callback) {

  var wished   = softwares.length;
  var installed = 0;
  softwares.forEach(function (_software, _i) {

    // Determine wanted software properties
    var software;
    try {
      software = u.format.software(_software);
    } catch (errFormat) {
      callback(errFormat);
      return;
    }
    for (var key in software) {
      if (software[key] === null) delete software[key];
    }

    async.waterfall([
      // Get ruche.json
      function (cb) {
        u.get.json(software.name, function (err, cache) {
          cb(err, cache);
        });
      },
      // Find the software
      function (cache, cb) {
        var match = u.match.find(software, cache)[0];
        if (match) {
          cb(null, match);
          return;
        }
        cb(new u.error(230, null, { software: software }), null);
      },
      // Get the archive
      function (match, cb) {
        var task = {
          name : _software,
          match: match
        };
        process.tasks[_i] = task;
        u.get.archive(_i, function (err) {
          cb(err);
        });
      },
      // Unzip the archive
      function (cb) {
        u.unzip(_i, function (err) {
          cb(err);
        });
      },
      // Register binaries
      function (cb) {
        u.register(_i);
        cb(null);
      }

    // Final callback
    ], function (err) {
      if (err) {
        callback(err);
        return;
      }
      installed++;
      if (installed === wished) {
        callback(null);
      }
    });

  });

};
