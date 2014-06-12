// Module dependencies.
var debug   = require('debug')('ruche');
var emitter = require('./util/emitter');
var error   = require('./util/error');

/**
 * @namespace Ruche
 */
var Ruche = {
  version:      require('./version'),
  help:         require('./help'),
  install:      require('./install'),
  uninstall:    require('./uninstall'),
  alternatives: require('./alternatives'),
};

debug('Ruche namespace created.');

// Handle uncaught exceptions
error.exception();

module.exports = Ruche;