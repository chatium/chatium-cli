import { customAlphabet } from 'nanoid'
import { Arguments, CommandModule } from 'yargs'

import { openCommand } from './commands/openCommand'

export const tunnel: CommandModule = {
  command: 'tunnel <port>',
  describe: 'Websocket tunnel client for convenient Chatium app development',
  builder: (yargs) => yargs
    .options({
      server: {
        type: 'string',
        default: 'wss://lt.chatium.io',
        description: 'Custom websocket server',
      },
      domain: {
        type: 'string',
        default: customAlphabet('qwertyuiopasdfghjklzxcvbnm1234567890', 8)(),
        description: 'Custom domain prefix (default random generated)',
      },
    }),
  handler: async (args: Arguments) => {
    const port = parseInt(args.port as string)

    await openCommand({
      server: args.server as string,
      domain: args.domain as string,
      port
    })
  }
}

