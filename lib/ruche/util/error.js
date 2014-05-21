var debug = require('debug')('ruche:error');
var util = require('util');

/**
 * [handle description]
 * @param  {[type]} message
 * @param  {[type]} args
 * @return {[type]}
 */
var handle = function (message, args) {
  
  var e = new Error(message);
  Error.prototype.args = args;
  debugOutput = e.stack
  if (args !== null) {
    debugOutput += '\n  More info: ' + util.inspect(e.args)
  }
  debug(debugOutput);

};

module.exports.handle = handle;