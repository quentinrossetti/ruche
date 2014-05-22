// Module dependencies.
var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var valid = require('./util/valid');

/**
 * Show a contextual help.
 * @param  {String} [context] Command you want to know more about.
 * @return {String}
 */
var help = function (context) {
  if (_.contains(valid.commands(), context)) {
    var file = 'help-' + context + '.txt'
  } else {
    var file = 'help.txt';
  }
  file = path.resolve(__dirname + '../../../doc/cli/' + file);
  var txt = fs.readFileSync(file, 'utf8');
  return txt;
};

module.exports = help;