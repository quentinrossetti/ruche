// Module dependencies.
var debug = require('debug')('ruche:package:curl:plainzip');
var path = require('path');
var fs = require('fs');
var unzip = require('unzip');

/**
 * Install cURL
 * @param  {Object} package The result of the match in ruche.json
 */
var script = function (match) {
  
  var longName = match.package + '-' + match.version + '-' + match.platform;
  var longPath = path.resolve('tpm/' + match.package + '/simple');
  fs.mkdirSync(path.resolve('tpm/curl'));
  // fs.mkdirSync(longPath, 0777, true);
  // var pathTmp  = path.resolve('tmp');
  // var pathFile = path.resolve('tmp/' + longName + '.zip');

  
  // var readStream = fs.createReadStream(pathFile);
  // var writeStream = fstream.Writer(longPath);

  // readStream.pipe(unzip.Parse()).pipe(writeStream);
};

module.exports = script;