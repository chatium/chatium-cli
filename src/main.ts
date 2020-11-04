#!/usr/bin/env node

import yargs from 'yargs'

import { loadConfig } from 'config'
import { setApiLocalBaseUrl } from './api'

import { auth } from 'modules/auth'
import { application } from 'modules/application'
import { account } from 'modules/account'
import { tunnel } from 'modules/tunnel'

loadConfig()

const args = yargs(process.argv.slice(2))
  .options('local', { hidden: true })
  .command('auth', 'Login, logout, check', auth)
  .command('app', 'Manage applications', application)
  .command('account', 'Manage accounts', account)
  .command('tunnel', 'Dev tunnel', tunnel)
  .help()
  .epilogue('for more information, find our manual at https://chatium.com')
  .showHelpOnFail(true)
  .locale('en')
  .parse()

if (args.local) {
  setApiLocalBaseUrl()
}
