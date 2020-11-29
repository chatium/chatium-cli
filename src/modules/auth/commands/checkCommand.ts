import chalk from 'chalk'
import { config } from 'config'
import { api } from 'api'
import ora from 'ora'
import { CommandModule } from 'yargs'

export const checkCommand: CommandModule = {
  handler: async () => {
    if (config.token === null) {
      console.log(chalk.red('– Not authorized'))
    } else {
      const spinner = ora('Checking authorization...').start()
      try {
        const response = await api.get('/api/dev/auth')

        spinner.stop()

        if (response.success) {
          const name = [response.data.auth.first_name, response.data.auth.last_name].join(' ')
          console.log(chalk.green('+ Authorized as'), chalk.green.bold(name))
        } else {
          console.log(chalk.red('– Invalid credentials'))
        }
      } catch (e) {
        spinner.stop()

        console.log(chalk.red('– Invalid credentials:', chalk.bold(e.message)))
      }
    }
  }
}
