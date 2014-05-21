var debug = require('debug')('ruche:error');
var util = require('util');

/**
 * Handle errors
 * @param  {Error} error
 * @return {Error}
 */
var handle = function (err) {
  debug(err);
  process.exit(1)
  return err;
};

module.exports.handle = handle;