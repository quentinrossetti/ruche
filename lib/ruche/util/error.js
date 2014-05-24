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

/**
 * The uncaughtException handler. Stops the process on Error
 * @return {Boolean} Returns the status of the app.
 */
var exception = function () {
  process.on('uncaughtException', function (err) {
    handle(err);
    return false;
  });
  return true;
}

module.exports.handle = handle;
module.exports.exception = exception;
