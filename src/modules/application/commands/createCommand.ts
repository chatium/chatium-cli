import { CommandModule } from 'yargs'
import { AxiosError } from 'axios'
import chalk from 'chalk'
import inquirer from 'inquirer'
import ora from 'ora'

import { api } from 'api'

interface Options {
  slug?: string
  name?: string
  description?: string
}

export const createCommand: CommandModule = {
  command: 'create [--name] [--description]',
  describe: 'Create new application',
  builder: (yargs) => yargs
    .options({
      slug: { type: 'string' },
      name: { type: 'string' },
      description: { type: 'string' },
    }),
  handler: async (args) => {
    const prompt = await inquirer.prompt<Options>([
      {
        name: 'slug',
        message: 'Application slug (url part) (a-z0-9-)',
        when: !args.slug,
        validate(input: string): boolean {
          return input.length > 0
        },
        transformer(input: string): string {
          return input.trim().toLowerCase()
        },
      },
      { name: 'name', message: 'Application name', when: !args.name },
      { name: 'description', message: 'Description', when: !args.description },
    ])

    const payload = {
      slug: args.slug || prompt.slug,
      name: args.name || prompt.name,
      description: args.description || prompt.description,
    }

    const spinner = ora('Creating application...').start()
    try {
      const response = await api.post('/api/dev/app', payload)
      spinner.stop()

      console.log(chalk.green('+ Application created successful'))
      console.log('')
      console.log(chalk.green('       slug: ' + chalk.bold(response.data.slug)))
      console.log(chalk.green('    api_key: ' + chalk.bold(response.data.api_key)))
      console.log(chalk.green(' api_secret: ' + chalk.bold(response.data.api_secret)))
      console.log('')
      console.log(chalk.white('Use', chalk.cyan('chatium app list'), 'to show all yours applications.'))
    } catch (e) {
      spinner.stop()

      if ((e as AxiosError).response?.data.reason) {
        console.log(chalk.red('– Error: ' + chalk.bold((e as AxiosError).response?.data.reason)))
      } else {
        console.log(chalk.red('– Error: ' + chalk.bold(e.message)))
      }
    }
  }
}
