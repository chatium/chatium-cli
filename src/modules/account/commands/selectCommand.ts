import { CommandModule } from 'yargs'
import chalk from 'chalk'
import ora from 'ora'

import { api } from 'api'
import { config, storeConfig } from 'config/index'

export const selectCommand: CommandModule = {
  command: 'select',
  describe: 'Select account for manage',
  builder: (yargs) => yargs.demandCommand(1),
  handler: async (args) => {
    const name: string = args._.pop()!

    const spinner = ora('Check account...').start()
    try {
      const response = await api.get('/api/dev/account')
      spinner.stop()

      const existsAccount = response.data.find((a: Account) => a.name === name)
      if (!existsAccount) {
        console.log(chalk.red('– Account', chalk.bold(name), ' not found'))
      }

      storeConfig({ ...config, account: name })

      console.log(chalk.green('+ Current account is'), chalk.bold(name))
    } catch (e) {
      spinner.stop()
      console.log(chalk.red('– Error: ' + chalk.bold(e.message)))
    }
  }
}

interface Account {
  name: string
  title: string
}
