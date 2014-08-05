'use strict';
var u = require('./util');

/**
 * Install a list of new packages.
 * @param softwares [array] An array of wished software.
 * @param callback [function] Executed when done.
 */
module.exports = function (softwares, callback) {

  var left      = softwares.length;
  var installed = [];
  softwares.forEach(function (_software) {

    // Determine wanted software properties
    var software;
    try {
      software = u.format.software(_software);
    } catch (errFormat) {
      callback(errFormat, null);
      return;
    }

//    // Get the cache json if any
//    u.cache.json(software.name, function (err, cache) {
//      if (cache) {
//        //TODO: Installation process
//        installed.push()
//      }
//    });


//    // Get a ruche.json file (from cache or not)
//    u.get.json(software.name, function (errCache, cache) {
//      if (errCache) {
//        callback(errCache, null);
//        return;
//      }
//
//      // Determine the best match
//      var match;
//      try {
//        match = u.match.find(software.name, cache)[0];
//        process.tasks.push({
//          name: _software,
//          match: match
//        });
//      } catch (errMatch) {
//        callback(errMatch, null);
//        return;
//      }
//
//      if (--left === 0) {
//
//        // Get the archives (from cache or not)
//        var task_index = process.tasks.length - 1;
//        callback(null, task_index);
//      }
//
//    });

  });

};
