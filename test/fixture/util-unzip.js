'use strict';
var path = require('path');

module.exports.createTask = function () {
  var p = path.resolve(__dirname + '/packages/acme/acme-0.0.1-linux32.tar.gz');
  var t = {
    name: 'acme',
    match: {
      name: 'acme',
      version: '0.0.1',
      platform: 'linux32',
      link: 'http://localhost:42753/acme/acme-0.0.1-linux32.tar.gz'
    }
  };
  process.tasks[0] = t;
  process.tasks[0].gzPath = p;
};

module.exports.corruptTaskPresence = function () {
  var p = path.resolve(__dirname + '/packages/acme/notHere.tar.gz');
  process.tasks[0].gzPath = p;
};

module.exports.corruptTaskGz = function () {
  var p = path.resolve(__dirname + '/packages/acme/corruptGz.tar.gz');
  process.tasks[0].gzPath = p;
};

module.exports.corruptTaskTar = function () {
  var p = path.resolve(__dirname + '/packages/acme/corruptTar.tar.gz');
  process.tasks[0].gzPath = p;
};
