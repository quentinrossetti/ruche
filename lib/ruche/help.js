// Module dependencies.
var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var error = require('./util/error');

/**
 * Show a contextual help.
 * @param  {String} [command] Command you want to know more about.
 * @return {String}
 */
var help =  function (command) {
  var file = 'help';
  if (!_.isNull(command)) {
    file += '-' + command;
  }
  file += '.txt';
  file = path.resolve(__dirname + '../../../doc/cli/' + file);
  fs.readFile(file, 'utf8', function (err, data) {
    if (err) {
      error.handle(new Error('Can\'t read file'));
    };
    console.log(data);
  });
};

module.exports = help;