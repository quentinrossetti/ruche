// Module dependencies.
var debug = require('debug')('ruche:version');
var fs    = require('fs');
var path  = require('path');

/**
 * This function parse the `package.json` file of the current ruche 
 * installation to read its version number. The data (version number) are 
 * returned asynchronously because they are read from the file system.
 * @summary  Output the version number
 * @memberOf Ruche
 * @param    {function} callback A callback function that is executed when the 
 *                               version number is loaded. It gets two 
 *                               arguments `(err, data)` where `data` is the 
 *                               version number: a string like this `0.0.1`.
 * @example
 * var ruche = require('ruche');
 * ruche.version(function (err, data) {
 *   if (err) { // handle your error }
 *   console.log(data); // output the ruche version number
 * });
 * @throws   Can't read the ruche package.json file
 * @throws   Can't parse the ruche package.json file
 * @requires debug
 * @requires fs
 * @requires path
 * @since    0.0.1
 * @license  [The MIT License (MIT)]{@link http://git.io/QMeU-w}
 */
var version = function (callback) {
  debug('ruche.version() called');
  var e;

  var file = path.resolve(__dirname, '../../package.json');
  fs.readFile(file, { encoding: 'utf8' }, function (err, data) {
    if (err) {
      e = new Error('Can\'t read the ruche package.json file');
    }

    try {
      data = JSON.parse(data)
    } catch (err) {
      e = new Error('Can\'t parse package.json.');
    }

    callback(e, data.version);
  });

};

module.exports = version;