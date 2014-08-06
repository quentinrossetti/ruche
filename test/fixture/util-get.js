'use strict';
var fs     = require('fs');
var rimraf = require('rimraf');

var tmpRcRepository;

module.exports.corruptRepository = function () {
  tmpRcRepository = process.rc.repository;
  process.rc.repository = '???';
};

module.exports.alterRepository = function () {
  tmpRcRepository = process.rc.repository;
  var repo = process.rc.repository;
  if (repo.substr(repo.length - 1) !== '/') {
    repo += '/';
  } else {
    repo = repo.substr(0, repo.length - 1);
  }
  process.rc.repository = repo;
};

module.exports.restoreRepository = function () {
  process.rc.repository = tmpRcRepository;
};

module.exports.removeTmpDir = function () {
  rimraf.sync(process.rc.dir.tmp);
};

module.exports.restoreTmpDir = function () {
  fs.mkdirSync(process.rc.dir.tmp);
};

module.exports.createTask = function () {
  return {
    name: 'acme',
    match: {
      name: 'acme',
      version: '0.0.1',
      platform: 'linux32',
      link: 'http://localhost:42753/acme/acme-0.0.1-linux32.tar.gz'
    }
  };
};

module.exports.corruptTaskLink = function () {
  process.tasks[0].match.link = 'http://localhost:42753/error/arch.tar.gz';
};
