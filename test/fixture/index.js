'use strict';

module.exports = {

  env:     require('./env'),
  version: require('./version'),
  install: require('./install'),
  server : require('./server'),
  u: {
    cache: require('./util-cache'),
    get  : require('./util-get'),
    match: require('./util-match'),
    unzip: require('./util-unzip'),
    register: require('./util-register')
  }

};
