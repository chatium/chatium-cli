import { CommandModule } from 'yargs'

import { registerCommand } from './commands/registerCommand'
import { listCommand } from './commands/listCommand'

export const application: CommandModule = {
  command: 'app',
  describe: 'Manage applications',
  builder: yargs => yargs
    .command(registerCommand)
    .command(listCommand),
  handler: () => {}
}
