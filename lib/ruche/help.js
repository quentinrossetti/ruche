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
  if (context === 'global' || _.isUndefined(context)) {
    var file = 'help.txt';
  } else {
    var file = 'help-' + context + '.txt';
  }
  file = path.resolve(__dirname + '../../../doc/cli/' + file);
  debug('Help file is: ' + file);
  fs.readFile(file, { encoding: 'utf8'}, function (err, data) {
    if (err) { error.handle(err) };
    debug('Help called for ' + context + ' context');
    emitter.emit('help', data);
  });
};

module.exports = help;