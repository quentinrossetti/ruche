// Module dependencies.
var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var debug = require('debug')('ruche:module:help');
var valid = require('./util/valid');
var emitter = require('./util/emitter');
var error = require('./util/error');

/**
 * Show a contextual help.
 * @param  {String} [context] Command you want to know more about.
 */
var help = function (context) {
  if (_.contains(valid.commands(), context)) {
    var file = 'help-' + context + '.txt'
  } else {
    var file = 'help.txt';
  }
  file = path.resolve(__dirname + '../../../doc/cli/' + file);
  fs.readFile(file, { encoding: 'utf8'}, function (err, data) {
    if (err) { error.handle(new Error('ruche:module:help:readFile')) };
    emitter.emit('ruche:module:help', data)
  });
};

module.exports = help;