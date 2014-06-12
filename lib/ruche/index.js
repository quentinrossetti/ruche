// Module dependencies.
var debug = require('debug')('ruche');
var emitter = require('./util/emitter');
var error = require('./util/error');

/**
 * @namespace Ruche
 */
var Ruche = {};

// Handle uncaught exceptions
error.exception();

// Register commands
Ruche.version      = require('./version');
Ruche.help         = require('./help');
Ruche.install      = require('./install');
Ruche.uninstall    = require('./uninstall');
Ruche.alternatives = require('./alternatives');
debug('Ruche namespace created.');

module.exports = Ruche;