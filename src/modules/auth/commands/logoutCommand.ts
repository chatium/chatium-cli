import chalk from 'chalk'
import { storeConfig } from 'config'
import { CommandModule } from 'yargs'

export const logoutCommand: CommandModule = {
  command: 'logout',
  describe: 'Logout',
  handler: () => {
    storeConfig({ token: null })
    console.log(chalk.green('+ Logout successful'))
  }
}
