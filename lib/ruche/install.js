// Module dependencies.
var debug = require('debug')('ruche:install');
var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var help = require('./help');
var download = require('./util/download');
var emitter = require('./util/emitter');
var error = require('./util/error');

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
        
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir);
        }
        // This download will emit a RucheEmitter#install-package-file 
        // event on completion. 
        download(package.package, package.link, dest, package.options);
      }
    });
  }
  // End of process
};

/**
 * Match the lastest version of a package compatible with the user's plateform
 * @param  {Object} data     The ruche.json file
 * @param  {String} platform The user's plateform
 * @param  {String} package  Name of the package you want
 * @return {Object|false}    Return the info of the matched package. Otherwise
 *                           false is returned.
 */
function matchPackage(data, platform, package) {
  var sort = data.sort(function(a,b) {
    return parseFloat(b.version) - parseFloat(a.version)
  });
  for (var i = 0; i < sort.length; i++) {
    if (sort[i].platform === platform) {
      debug('Match found for ' + sort[i].package + ': %j', sort[i]);
      return sort[i];
    }
  }
  debug('No match found for ' + package);
  return false;
}

module.exports = install;