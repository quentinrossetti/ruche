// Module dependencies.
var debug = require('debug')('ruche:register');
var rc = require('rc')('ruche');
var path = require('path');
var fs = require('fs');
var tar = require('tar');
var zlib = require('zlib');
var progress = require('progress');
var parse = require('./parse');
var emitter = require('./emitter');
var error = require('./error');

/**
 * A extractor and path recorder
 * @param {Object} match The package math in ruche.json
 * @fires RucheEmitter#install-package-extract
 * @fires RucheEmitter#install-package-path
 * @fires RucheEmitter#install-package-done
 */
var register = function (match) {

  debug('Script initialized');
  
  var long = match.package + '-' + match.version + '-' + match.platform;
  var share = parse.untilde(rc.dir.share + '/' + match.package);
  if (!fs.existsSync(share)) {
    fs.mkdirSync(share);
  } 

  var gzFile = parse.untilde(rc.dir.tmp + '/' + long + '.tar.gz');
  var tarFile = parse.untilde(rc.dir.tmp + '/' + long + '.tar');

  var gzStream = fs.createReadStream(gzFile);
  var tarStream = fs.createWriteStream(tarFile);

  // Error handling
  gzStream.on('error', function (err) {
    error.handle(err);
  });
  tarStream.on('error', function (err) {
    error.handle(err);
  });

  // On data
  gzStream.on('data', function (chunk) {
    emitter.emit('install-' + match.package + '-gz-chunk', chunk);
  });

  // On unzip end
  gzStream.on('end', function () {
    emitter.emit('install-' + match.package + '-gz-done');
    emitter.emit('install-' + match.package + '-tar-res', fs.statSync(tarFile)['size']);
    tarStream = fs.createReadStream(tarFile);
    tarStream.pipe(tar.Extract({ path: share }));
    var pathrc = parse.untilde(rc.dir.path);

    for (var bin in match.bin) {
      debug(match.bin[bin]);
      var file = path.resolve(pathrc + '/' + bin + '.cmd');
      var txt = '"' + share + '\\' + long + '\\' + match.bin[bin] + '" %*';
      fs.writeFileSync(file, txt);
      fs.unlinkSync(tarFile);
    }; 
    emitter.emit('install-' + match.package + '-done', long);
  });
  
  // Unzip
  emitter.emit('install-' + match.package + '-gz-res', fs.statSync(gzFile)['size']);
  gzStream.pipe(zlib.Gunzip()).pipe(tarStream);
  
};

module.exports = register;