// Module dependencies.
var debug = require('debug')('ruche:install');
var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var emitter = require('./util/emitter');
var error = require('./util/error');

/**
 * Show the version number.
 * @param {Array|String} packages The packages you want to install
 * @fires RucheEmitter#installStart
 * @fires RucheEmitter#installFiles
 * @fires RucheEmitter#installPath
 * @fires RucheEmitter#installDone
 */
var install =  function (packages) {
  // Install things
};

module.exports = install;