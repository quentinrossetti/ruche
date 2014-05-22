// Module dependencies.
var debug = require('debug')('ruche:help');
var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var emitter = require('./util/emitter');
var error = require('./util/error');
var valid = require('./util/valid');

/**
 * Show a contextual help.
 * @fires RucheEmitter#help
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
    emitter.emit('help', data)
  });
};

module.exports = help;