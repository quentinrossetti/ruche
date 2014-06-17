// Module dependencies
'use strict';
var debug = require('debug')('ruche:test:fixture');

/**
 * Fixture: Fake an process.argv arary with a custom command
 * @param  {string} str Your custom command
 * @return {array} process.arv array
 */
var argv = function (str) {
  str = 'node ' + str;
  str = str.split(' ');
  debug('Successfully fake argv for:%s', str);
  return str;
};

module.exports = argv;
