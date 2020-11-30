import { CommandModule } from 'yargs'

import { createCommand } from './commands/createCommand'

export const creator: CommandModule = {
  command: 'create <name>',
  describe: 'Create chatium backend from template',
  builder: (yargs) => yargs
    .options({
      name: { type :'string' }
    }),
  handler: async (args) => {
    await createCommand({
      name: args.name as string,
      path: process.cwd() + '/' + args.name,
      repo: 'git@github.com:chatium/node-sdk-template.git'
    })
  }
}

