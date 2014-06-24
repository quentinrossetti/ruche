// Module dependencies.
var debug    = require('debug')('ruche');
var rc       = require('rc')('ruche');
var path     = require('path');
var fs       = require('fs');
var request  = require('request');
var _        = require('underscore');
var emitter  = require('./util/emitter');
var untilde  = require('./util/untilde');
var register = require('./util/register');
var match    = require('./util/match');

/**
 * This function allows you to switch between different versions and
 * installations of the same package. So both a bleeding edge and a legacy
 * version are availables at your fingertips.
 * @summary  Switch between versions.
 * @memberOf Ruche
 * @param    {string} package The package you want to manipulate. It could be
 *           either in a *short format*: `curl` or in a *long format*:
 *           `curl-7.36.0-win64`. To actually change the aliases in the path
 *           you have to specify a long format package name.
 * @param    {function} callback A callback function that is executed on
 *           completion. It gets two arguments `(err, data)` where `data` is a
 *           flat array of locally availables packages (in *long format*:
 *           `curl-7.36.0-win64`).
 * @example
 * var ruche = require('ruche');
 * // Show local alternatives
 * ruche.alternatives('curl', function (err, data) {
 *   if (err) {
 *     // handle your error
 *   }
 *   console.dir(data); // [ 'curl-7.35.0-win32', 'curl-7.37.0-win64' ]
 * });
 * // Use one
 * ruche.alternatives('curl-7.37.0-win64', function (err, data) {
 *   if (err) {
 *     // handle your error
 *   }
 *   console.dir(data); // [ 'curl-7.35.0-win32', 'curl-7.37.0-win64' ]
 * });
 * @requires debug
 * @requires rc
 * @requires fs
 * @requires path
 * @requires request
 * @requires underscore
 * @since    0.0.1
 * @license  [The MIT License (MIT)]{@link http://git.io/QMeU-w}
 */
var alternatives = function (package, callback) {

  var wanted = {
    package: package.split('-')[0],
    version: package.split('-')[1] || false,
    platform: package.split('-')[2] || false,
  };
  var share = untilde(rc.dir.share + '/' + wanted.package);
  // Get local packages
  fs.readdir(share, function (err, files) {
    if (err) {
      callback(err, undefined);
      return;
    }
    /**
     * Emitted when alternatives are availables
     * @event RucheUtil#alt-show
     * @type  {object}
     * @param {array} alternatives Versions of the file availables locally
     * @see   Ruche.alternatives
     */
    emitter.emit('alt-show', files);

    emitter.on('alt-choice', function (answer) {
      // Get ruche.json file
      var repoUrl = rc.repository + '/' + wanted.package + '/ruche.json';
      var repoOpts = { url: repoUrl, json: true };
      request(repoOpts, function (err, res, data) {
        var find = match(wanted, data);
        register(find, 'alt', function (binaries) {
          debug('Alternative set to %s', answer);
          callback(undefined, files);
        });
      });
    });

    // Register the alternative directly if specified (no CLI prompt)
    if (package.split('-').length === 3) {
      if(_.contains(files, package)) {
        /**
         * Emitted when the user chose an alternative version
         * @event RucheUtil#alt-choice
         * @type  {object}
         * @param {string} package The package name in *long format*
         * @see   Ruche.alternatives
         */
        emitter.emit('alt-choice', package);
      } else {
        callback(new Error('The version specified is not valid'), undefined);
        return;
      }
    } else {
      callback(undefined, files);
    }
  });
};

module.exports = alternatives;
