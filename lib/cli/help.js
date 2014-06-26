// Module dependencies
'use strict';
var debug    = require('debug')('ruche:cli');
var cliUtil  = require('./util');
var ruche    = require('../ruche/help');

// Output the help to stdout.
var help = function (context, callback) {
  ruche(context, function (err, data) {
    if (err) {
      cliUtil.error(err);
    }

    debug('Help command executed from CLI');
    console.log(data);

    if (callback !== undefined) {
      callback();
    }
  });

};

module.exports = help;
