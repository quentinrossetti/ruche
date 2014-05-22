// Module dependencies.
var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var error = require('./util/error');

/**
 * Show a contextual help.
 * @param  {String} [context] Command you want to know more about.
 * @return {String}
 */
var help =  function (context) {
  var file = 'help';
  if (context === 'global') {
    file += '-' + context;
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