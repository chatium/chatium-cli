import { customAlphabet } from 'nanoid'
import yargs from 'yargs'

import { openCommand } from './commands/openCommand'

export function tunnel(yargs: yargs.Argv) {
  const options = yargs.options({
      server: { type: 'string', default: 'wss://lt.chatium.io' },
      domain: { type: 'string', default: customAlphabet('qwertyuiopasdfghjklzxcvbnm1234567890', 8)() },
    }).parse()

  const port = parseInt(yargs.demandCommand(1).parse()['_'].pop()!)

  openCommand({
    server: options.server,
    domain: options.domain,
    port
  })
}
