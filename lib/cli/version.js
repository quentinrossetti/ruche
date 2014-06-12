// Module dependencies.
var debug = require('debug')('ruche:cli:version');
var ruche = require('../ruche/version');
var error = require('../ruche/util/error');

/**
 * Call the ruche.version() and output the result to stdout.
 * @param  {Function} callback A callback function that is executed when the 
 *                             output has been written.
 * @memberOf Cli
 */
var version = function (callback) {

  ruche(function (err, data) {
    if (err) {
      error.handle(err);
    }

    console.log('v%s', data);

    if (callback !== undefined) {
      callback();
    }    
  });

};

module.exports = version;