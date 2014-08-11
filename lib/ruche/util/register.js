'use strict';
var fs = require('fs');
var path = require('path');
var u = {
  error: require('./error'),
  format: require('./format')
};

/**
 * Register all binaries in the bin directory of ruche.
 * @param taskIndex [number] Position of the task in the `process.tasks` array.
 * @returns {null|true}
 */
module.exports = function (taskIndex) {

  var match = process.tasks[taskIndex].match;
  if (match.bin === undefined) {
    return null;
  }

  var long = u.format.long(match);
  var share  = process.rc.dir.share + '/' + match.name + '/' + long;
  share = path.resolve(share);

  //TODO: Throw an 231 error if invalid match.bin content
  for (var bin in match.bin) {
    var file = path.resolve(process.rc.dir.bin + '/' + bin + '.cmd');
    var txt  = '@echo off\n';
    txt += '"' + share + '\\' + match.bin[bin] + '" %*';
    fs.writeFileSync(file, txt);
  }

  return true;

};
