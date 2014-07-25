'use strict';
var u = require('./util');

module.exports = function (softwares, callback) {

  softwares.forEach(function (_software) {
    console.dir(u.format(_software));
  });
  callback(null, 1);

};
