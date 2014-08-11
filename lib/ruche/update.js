'use strict';
var async = require('async');
var u = require('./util');

/**
 * Update a list of new packages.
 * @param wishes [array] An array of wished software.
 * @param callback [function] Executed when done.
 */
module.exports = function (wishes, callback) {

  var wished    = wishes.length;
  var treated = 0;
  wishes.forEach(function (_wish, _i) {

    // Determine wanted software properties
    var software;
    try {
      software = u.format.software(_wish);
    } catch (errFormat) {
      callback(errFormat);
      return;
    }
    for (var key in software) {
      if (software[key] === null) delete software[key];
    }

    //TODO: Use cache
    async.waterfall([

      // Get ruche.json
      function (cb) {
        u.get.json(software.name, function (err, cache) {
          cb(err, cache);
        });
      },

      // Get list of installed software
      function (cache, cb) {
        u.match.update(software, function (err, match) {
          if (err) {
            cb(err);
            return;
          } else if (match === null) {
            cb(null, null);
          }
        });
      },

    // Final callback
    ], function (err, result) {
      if (err) {
        callback(err);
        return;
      }
      treated++;
      if (treated === wished) {
        callback(null);
      }
    });
  });

};
