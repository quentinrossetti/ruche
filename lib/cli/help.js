// Module dependencies.
var ruche = require('../ruche');
var _ = require('underscore');

/**
 * Returns ruche's help or a ruche's command help.
 *
 * @param {Object} argv An arguments object.
 * @param {Function} callback Triggered on completion.
 */
var help = function (argv, callback) {
  var command = argv._.slice(0)[0];
  var list = require('../ruche/util/commands').list();
  if (!_.contains(list, command)) {
    ruche.emit('error', 'This command does not exists.', command);
  }
  
};