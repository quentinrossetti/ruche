// Module dependencies.
var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/**
 * Show a contextual help.
 * @param  {String} [context] Command you want to know more about.
 * @return {String}
 */
var help = function (context) {
  if (_.isUndefined(context) || context === 'global') {
    var file = 'help.txt';
  } else {
    var file = 'help-' + context + '.txt'
  }
  file = path.resolve(__dirname + '../../../doc/cli/' + file);
  var txt = fs.readFileSync(file, 'utf8');
  return txt;
};

module.exports = help;