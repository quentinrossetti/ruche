// Module dependencies.
var emitter = require('events').EventEmitter;
var _ = require('underscore');

/**
 * The ruche core class.
 * 
 * @param  {Object} rc Configuration
 * @return {Object}
 */
function ruche(rc) {
  this.rc = rc;
  return ruche;
}

// Makes an EventEmitter of ruche
_.extend(ruche, new emitter());

// Register commands
//ruche.alternatives = require('./alternatives');
ruche.help = require('./help');
ruche.version = require('./version');
//ruche.install = require('./install');
//ruche.uninstall = require('./uninstall');

module.exports = ruche;
