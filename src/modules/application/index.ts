import { CommandModule } from 'yargs'

import { createCommand } from './commands/createCommand'
import { listCommand } from './commands/listCommand'

export const application: CommandModule = {
  command: 'app',
  describe: 'Manage applications',
  builder: yargs => yargs
    .command(createCommand)
    .command(listCommand),
  handler: () => {}
}
