// Module dependencies.
var debug = require('debug')('ruche:install');
var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var help = require('./help');
var emitter = require('./util/emitter');
var error = require('./util/error');

/**
 * Show the version number.
 * @param {Array|String} packages The packages you want to install
 */
var install =  function (packages) {
  if (_.isEmpty(packages)) {
    help('install');
    debug('no packages specified');
  }
  // Package is a string => one package
  if (_.isString(packages)) {
    packages = [packages];
  }
 // Read the local directory
  var file, package;
  for (var i = packages.length - 1; i >= 0; i--) {
    package = packages[i];
    file = path.resolve(__dirname + '../../../packages/' + package +'.js');
    debug('Reading: ' + file);
    require('../../packages/' + package);
  };
  return packages;
};

function doInstall(packages) {
  
  // fs.readFile(packageListFile, { encoding: 'utf8'}, function (err, data) {
  //   if (err) {
  //     error.handle(new Error('ruche:module:install:readPackageFile'))
  //   }
  //   emitter.emit('installRead', JSON.parse(data));
  // });
};

module.exports = install;