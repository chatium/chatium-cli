import { api } from 'api'
import chalk from 'chalk'
import { config, storeConfig } from 'config/index'
import ora from 'ora'

interface Options {
  name: string
}

export async function selectCommand(options: Options) {
  const spinner = ora('Check account...').start()
  try {
    const response = await api.get('/api/dev/account')
    spinner.stop()

    const existsAccount = response.data.find((a: Account) => a.name === options.name)
    if (!existsAccount) {
      console.log(chalk.red('– Account', chalk.bold(options.name), ' not found'))
    }

    storeConfig({ ...config, account: options.name })

    console.log(chalk.green('+ Current account is'), chalk.bold(options.name))
  } catch (e) {
    spinner.stop()
    console.log(chalk.red('– Error: ' + chalk.bold(e.message)))
  }
}

interface Account {
  name: string
  title: string
}
