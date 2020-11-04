import yargs from 'yargs'

import { checkCommand } from './commands/checkCommand'
import { loginCommand } from './commands/loginCommand'
import { logoutCommand } from './commands/logoutCommand'

export function auth(yargs: yargs.Argv) {
  yargs
    .command('login [--local]', 'Login', async (yargs) => loginCommand(
      yargs.options({
        local: { type: 'boolean', default: false, hidden: true },
      }).parse()
    ))
    .command('logout', 'Logout', logoutCommand)
    .command('check', 'Check auth', checkCommand)
}
