// Module dependencies
'use strict';
var gulp  = require('gulp');
var child = require('child_process');

/**
 * Execute the tests and output to `stdout`
 * @param  {function} callback Function to execute when the task is done.
 */
gulp.task('test', function (callback) {
  child.exec('npm test', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    callback(err);
  });
});

/**
 * Run the test coverage script and output to the `test/coverage` directory
 * @param  {function} callback Function to execute when the task is done.
 */
gulp.task('coverage', function (callback) {
  child.exec('npm run coverage', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    callback(err);
  });
});

/**
 * Generate the API and CLI documentation into the `doc/api/`directory
 * @param  {function} callback Function to execute when the task is done.
 */
gulp.task('doc', function (callback) {
  child.exec('npm run doc', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    callback(err);
  });
});

/**
 * Parse the JavaScript files and give some hints to improve it.
 * @param  {function} callback Function to execute when the task is done.
 */
gulp.task('hint', function (callback) {
  var command = 'jshint . --reporter node_modules/jshint-stylish/stylish.js';
  // Windows specific
  var jshint = child.spawn('cmd', ['/c ' + command], { stdio: 'inherit'});
  jshint.on('data', function (data) {
    console.log(data);
  });
  jshint.on('error', function (err) {
    callback(err);
  });
});
