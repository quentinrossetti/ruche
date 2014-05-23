/**
 * Fake an process.argv arary with a custom command
 * @param  {String} str Your custom command
 * @return {Array}      process.arv array
 */
var argv = function (str) {
  str = 'node bin ' + str;
  return str.split(' ');
}

module.exports.argv = argv;