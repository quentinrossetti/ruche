// Module dependencies.
var debug = require('debug')('ruche:alternatives');
var rc = require('rc')('ruche');
var path = require('path');
var fs = require('fs');
var request = require('request');
var emitter = require('./util/emitter');
var error = require('./util/error');
var untilde = require('./util/untilde');

/**
 * Switch between versions.
 * @param {String} package The package you want to manipulate
 * @param {String|false} alt Full name-version-platform of a package
 * @fires RucheEmitter#alt-show
 */
var alternatives = function (package, alt) {
  var share = untilde(rc.dir.share + '/' + package);

  // Get local packages
  fs.readdir(share, function (err, files) {
    if (err) { error.handle(err); }
    emitter.emit('alt-show', files);

    emitter.on('alt-choice', function (answer) {
      // Get ruche.json file
      var repoUrl = rc.sources.repository + package + '/ruche.json';
      var repoOpts = { url: repoUrl, json: true };
      request(repoOpts, function (err, res, data) {
        if (err) { error.handle(err); }

        // Match wanted against the ruche.json file.
        var local = {
          package: answer.split('-')[0],
          version: answer.split('-')[1],
          platform: answer.split('-')[2]
        };
        var repoMatch = require('./util/match')(local, data);

        // Register
        require('./util/register')(repoMatch, 'alt');
      });
    });

    // Register the alternative directly if specified (no CLI prompt)
    if (alt !== false) {
      debug('Choice set to %s', alt);
      emitter.emit('alt-choice', alt);
    }
  });
};

module.exports = alternatives;
