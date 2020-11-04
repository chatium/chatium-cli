import { CommandModule } from 'yargs'

import { listCommand } from './commands/listCommand'
import { selectCommand } from './commands/selectCommand'

export const account: CommandModule = {
  command: 'account',
  aliases: 'acc',
  describe: 'Manage accounts',
  builder: (yargs) => yargs
    .command(listCommand)
    .command(selectCommand),
  handler: (args) => console.log('account', args)
}
