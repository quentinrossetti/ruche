// Module dependencies.
var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/**
 * Show a contextual help.
 * @param  {String} command The command you want to know more about.
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
    console.log(data);
  });
};

module.exports = help;