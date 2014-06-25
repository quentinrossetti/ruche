[![ruche logo](https://raw.githubusercontent.com/quentinrossetti/ruche/master/doc/assets/ruche-logo.png)](https://github.com/quentinrossetti/ruche)

[![Dependencies Status][gemnasium-image]][gemnasium-url] [![Build Status][travis-image]][travis-url] [![Code quality][codeclimate-image]][codeclimate-url] [![Code coverage][coveralls-image]][coveralls-url]

> A developer-friendly Windows package manager

## What is ruche ?

ruche is designed to help Windows developers to work. It takes care of software
installations, updates, and alternatives versions switching.

## Usage

You can use ruche in a terminal:
```bat
ruche install <package>
ruche uninstall <package>
ruche alternatives <package>
```

As a node module:
```js
var ruche = require('ruche');
ruche.install(['git'], function (err, packages) {
  if (err) {
    // handle the error
  }
  console.log('Packages installed %s', packages)
});
```

[ruche-url]: https://github.com/quentinrossetti/ruche
[ruche-image]: raw.githubusercontent.com/quentinrossetti/ruche/master/doc/assets/ruche-logo.png
[david-url]: https://david-dm.org/quentinrossetti/ruche
[david-image]: https://david-dm.org/quentinrossetti/ruche.svg
[gemnasium-url]: https://gemnasium.com/quentinrossetti/ruche
[gemnasium-image]: http://img.shields.io/gemnasium/quentinrossetti/ruche.svg
[travis-url]: https://travis-ci.org/quentinrossetti/ruche
[travis-image]: http://img.shields.io/travis/quentinrossetti/ruche.svg
[codeclimate-url]: https://codeclimate.com/github/quentinrossetti/ruche
[codeclimate-image]: http://img.shields.io/codeclimate/github/quentinrossetti/ruche.svg
[coveralls-url]: https://coveralls.io/r/quentinrossetti/ruche
[coveralls-image]: http://img.shields.io/coveralls/quentinrossetti/ruche.svg
