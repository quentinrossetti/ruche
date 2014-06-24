#!/usr/bin/env node

// Module dependencies
var debug   = require('debug')('ruche:bin');
var repl    = require('repl');
var ruche   = require('../lib/ruche');

// Start the REPL with ruche available
var prompt = repl.start({ prompt: 'ruche> ' });
prompt.context.ruche         = ruche;
prompt.context.help          = ruche.help;
prompt.context.version       = ruche.version;
prompt.context.install       = ruche.install;
prompt.context.uninstall     = ruche.uninstall;
prompt.context.alternatives  = ruche.alternatives;
debug('ruche REPL loaded');
