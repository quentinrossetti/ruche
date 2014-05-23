[![ruche logo](https://raw.githubusercontent.com/quentinrossetti/ruche/master/doc/assets/ruche-logo.png)](https://github.com/quentinrossetti/ruche)

[![Dependencies Status][david-image]][david-url] [![Build Status][travis-image]][travis-url]

> A Windows developer's best friend

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
ruche.install('git');
```

Or with the REPL:
```bat
ruche-repl
ruche> ruche.version();
ruche> version(); # Works too!
```

[ruche-url]: https://github.com/quentinrossetti/ruche
[ruche-image]: raw.githubusercontent.com/quentinrossetti/ruche/master/doc/assets/ruche-logo.png
[david-url]: https://david-dm.org/quentinrossetti/ruche
[david-image]: https://david-dm.org/quentinrossetti/ruche.svg
[travis-url]: https://travis-ci.org/quentinrossetti/ruche
[travis-image]: http://img.shields.io/travis/quentinrossetti/ruche.svg
