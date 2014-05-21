/**
 * Returns the list of available commands.
 * @return {Array}
 */
var commands = function () {
  return ['install', 'uninstall', 'alternatives'];
};

/**
 * Returns an object of arrays containing legal options by context.
 * @return {Object}
 */
var options = function () {
  return {
    'global': ['help', 'version', 'verbose', 'quiet', 'silent'],
    'install': ['no-path'],
    'uninstall': ['keep'],
    'alternatives': []
  };
}

module.exports.commands = commands;