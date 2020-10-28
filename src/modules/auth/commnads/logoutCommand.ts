import chalk from 'chalk'
import { storeConfig } from 'config'

export async function logoutCommand() {
  storeConfig({ token: null })
  console.log(chalk.green('+ Logout successful'))
}
