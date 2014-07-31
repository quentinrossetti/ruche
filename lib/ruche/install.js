'use strict';
var u = require('./util');

/*
 * Install a list of new packages.
 */
module.exports = function (softwares, callback) {

  var wanted = [];
  softwares.forEach(function (_software, _i) {
    wanted.push(u.format.software(_software));
  });
  console.dir(wanted);

  callback(null, null);

};
