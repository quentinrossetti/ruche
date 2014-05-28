// Module dependencies.
var debug = require('debug')('ruche:install');
var fs = require('fs');
var rc = require('rc')('ruche');
var path = require('path');
var _ = require('underscore');
var help = require('./help');
var download = require('./util/download');
var emitter = require('./util/emitter');
var error = require('./util/error');
var matchPackage = require('./util/match');
var parse = require('./util/parse');

/**
 * Show the version number.
 * @param {Array|String} packages The packages you want to install
 * @fires RucheEmitter#install-fail
 */
var install =  function (packages) {
  
  // No package specified
  if (_.isEmpty(packages)) {
    help('install');
    debug('No package specified');
    error.handle(new Error('Installation failed: No package specified'));
    return packages;
  }

  // Package is a string => one package
  if (_.isString(packages)) {
    packages = [packages];
  }

  if (packages.length > 1) {
    emitter.emit('error', new Error('You can install only one package at a time.'));
  }

  var repository = path.resolve(__dirname + '../../../packages/');

  // Process installation
  for (var i = 0; i < packages.length; i++) {
    var package = packages[i];

    var package = package.split('-');
    package = {
      package: package[0],
      version: package[1],
      platform: package[2]
    };

    var file = path.resolve(repository + '/' + package.package + '/ruche.json');
    fs.readFile(file, { encoding: 'utf8'}, function (err, data) {
      if (err) { error.handle(err); };
      
      // Reading myPackage/ruche.json
      debug('Reading repository: ' + file);
      try {
        data = JSON.parse(data);
      } catch (err) {
        error.handle(err);
      }
      var platform = package.platform || 'win' + process.env.architecture;

      debug('%j', package)

      var match = matchPackage(data, package);
      if (!match) {
        error.handle(new Error('No match found for ' + package.package));
      } else {
        package = match;
        var long = match.package + '-' + match.version + '-' + match.platform;
        
        // Listener for end of download
        emitter.on('install-' + match.package + '-dl-done', function (data) {
          require('./util/register')(match);
          var script = '../../packages/' + match.package + '/install';
          //debug('Use installation script: ' + match.script);
          //require(script)(match);
        });
        
        debug('Installation of %s started', long);
        var dl = long + '.tar.gz';
        var dest = parse.untilde(rc.dir.tmp + '/' + dl);

        // This download will emit a RucheEmitter#install-package-file 
        // event on completion. 
        download(match, dest);
      }
    });
  }
};

module.exports = install;