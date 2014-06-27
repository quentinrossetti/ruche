// Module dependencies
'use strict';
var debug = require('debug')('ruche');

// Returns valid options and commands
var valid = function () {
  var r = {
    'global': ['help', 'version', 'verbose', 'quiet', 'silent'],
    'install': [],
    'uninstall': [],
    'alternatives': ['choice']
  };
  debug('Valid options: %j', r);
  return r;
};

module.exports = valid;
