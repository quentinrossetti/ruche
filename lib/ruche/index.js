// Module dependencies
'use strict';
var debug = require('debug')('ruche');
var util  = require('./util');

var Ruche = {
  version:      require('./version'),
  help:         require('./help'),
  install:      require('./install'),
  uninstall:    require('./uninstall'),
  alternatives: require('./alternatives'),
};

debug('Ruche namespace created.');

// Handle uncaught exceptions
util.error();

module.exports = Ruche;
