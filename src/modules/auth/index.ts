import { CommandModule } from 'yargs'

import { checkCommand } from './commands/checkCommand'
import { loginCommand } from './commands/loginCommand'
import { logoutCommand } from './commands/logoutCommand'

export const auth: CommandModule = {
  command: 'auth',
  describe: 'Login, logout, check',
  builder: (yargs) => yargs
    .command(loginCommand)
    .command(logoutCommand)
    .command(checkCommand),
  handler: () => {},
}
