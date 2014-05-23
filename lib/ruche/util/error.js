// Module dependencies.
var debug = require('debug')('ruche:error');

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

var exception = function () {
  process.on('uncaughtException', function (err) {
    handle(err);
  });
}

module.exports.handle = handle;
module.exports.exception = exception;
