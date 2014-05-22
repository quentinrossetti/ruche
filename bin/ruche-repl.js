#!/usr/bin/env node

// Module dependencies.
var debug = require('debug')('ruche:repl');
var repl = require('repl');
var ruche = require('../lib/ruche');

// Start the REPL with ruche available
var prompt = repl.start({ prompt: 'ruche> ' });
prompt.context.ruche = ruche;