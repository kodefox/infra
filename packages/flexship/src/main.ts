#!/usr/bin/env node
import yargs from 'yargs';

yargs
  .alias('version', 'V')
  .commandDir('./commands', { extensions: ['ts', 'js'] })
  .demandCommand()
  .help().argv;
