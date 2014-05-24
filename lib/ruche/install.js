// Module dependencies.
var debug = require('debug')('ruche:install');
var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var help = require('./help');
var download = require('./util/download');
var emitter = require('./util/emitter');
var error = require('./util/error');
var matchPackage = require('./util/match');

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
    emitter.emit('install-fail', 'No package specified');
    return packages;
  }

  // Package is a string => one package
  if (_.isString(packages)) {
    packages = [packages];
  }

  var repository = path.resolve(__dirname + '../../../packages/');

  // Process installation
  for (var i = packages.length - 1; i >= 0; i--) {
    var package = packages[i];

    var package = package.split('-');
    package = {
      package: package[0],
      version: package[1],
      platform: package[2]
    };

    var file = path.resolve(repository + '/' + package.package + '/ruche.json')
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
      var match = matchPackage(data, platform, package.package);
      if (!match) {
        error.handle(new Error('No match found for ' + package.package));
      } else {
        package = match;
        // Listener for end of download
        emitter.on('install-' + package.package + '-file', function (data) {
          
        });
        debug('Installation of %s-%s-%s started',
          package.package,
          package.version,
          package.platform
        );
        var dl = package.package + '.' + package.format;
        var dest = path.resolve(__dirname, '../../tmp/' + dl);
        var destDir = path.dirname(dest);
        
        // This download will emit a RucheEmitter#install-package-file 
        // event on completion. 
        download(package.package, package.link, dest, package.options);
      }
    });
  }
  // End of process
};

module.exports = install;