#!/usr/bin/env node

import yargs from 'yargs'

import { loadConfig } from 'config'
import { application } from 'modules/application'
import { auth } from 'modules/auth'

loadConfig()

yargs(process.argv.slice(2))
  .command('auth', 'Login, logout, check', auth)
  .command('app', 'Create app', application)
  .parse()
