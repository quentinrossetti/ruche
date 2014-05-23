// Module dependencies.
var debug = require('debug')('ruche');
var emitter = require('./util/emitter');

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

// Register commands
ruche.version = require('./version');
ruche.help = require('./help');
ruche.install = require('./install');
//ruche.uninstall = require('./uninstall');
//ruche.alternatives = require('./alternatives');
debug('ruche populated with all its methods.')

module.exports = ruche;
