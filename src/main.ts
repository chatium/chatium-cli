#!/usr/bin/env node

import yargs from 'yargs'

import { loadConfig } from 'config'
import { setApiLocalBaseUrl } from './api'

import { auth } from 'modules/auth'
import { application } from 'modules/application'
import { account } from 'modules/account'
import { tunnel } from 'modules/tunnel'
import { creator } from 'modules/creator'

loadConfig()

const args = yargs(process.argv.slice(2))
  .options('local', { type: 'boolean', hidden: true })
  .command(auth)
  .command(application)
  .command(account)
  .command(tunnel)
  .command(creator)
  .help()
  .epilogue('for more information, find our manual at https://chatium.com')
  .showHelpOnFail(true)
  .locale('en')
  .parse()

if (args.local) {
  setApiLocalBaseUrl()
}
