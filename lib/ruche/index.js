// Module dependencies.
var debug = require('debug')('ruche');

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

module.exports = ruche;
