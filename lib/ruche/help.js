// Module dependencies
'use strict';
var _     = require('underscore');
var debug = require('debug')('ruche');
var fs    = require('fs');
var path  = require('path');
var util  = require('./util');

// Get the help
var help = function (context, callback) {
  debug('ruche.help() called');
  var e;

  // Optional context
  if (arguments.length === 1) {
    callback = context;
    context = 'global';
  }

  // Define the help file
  var file = 'help.txt';
  if (_.contains(_.keys(util.valid()).splice(1), context)) {
    file = 'help-' + context + '.txt';
  }

  file = path.resolve(__dirname, '../../doc/cli/', file);
  fs.readFile(file, { encoding: 'utf8'}, function (err, data) {
    if (err) {
      e = new Error('Can\'t read the help file');
      callback(e, undefined);
      return;
    }

    debug('Help for %s', context);
    callback(e, data);
  });
};

module.exports = help;
