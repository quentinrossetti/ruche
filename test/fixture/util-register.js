'use strict';
var path = require('path');

module.exports.createTaskNoBin = function () {
  process.tasks[0] = {
    name: 'acme',
    match: {
      name: 'acme',
      version: '0.0.1',
      platform: 'linux32',
      link: 'http://localhost:42753/acme/acme-0.0.1-linux32.tar.gz'
    }
  };
  return process.tasks[0].match;
};

module.exports.createTaskCorrupt = function () {
  process.tasks[0] = {
    name: 'acme',
    match: {
      name: 'acme',
      version: '0.0.1',
      platform: 'linux32',
      link: 'http://localhost:42753/acme/acme-0.0.1-linux32.tar.gz'
    },
    bin: {
      'bi/\nn1': 'corrupt.sh'
    }
  };
  return process.tasks[0].match;
};

module.exports.createTask = function () {
  process.tasks[0] = {
    name: 'acme',
    match: {
      name: 'acme',
      version: '0.0.1',
      platform: 'linux32',
      link: 'http://localhost:42753/acme/acme-0.0.1-linux32.tar.gz',
      bin: {
        bin1: 'bin1.sh',
        bin2: 'bin2.sh',
        bin3: 'bin3.sh'
      }
    }
  };
  return process.tasks[0].match;
};
