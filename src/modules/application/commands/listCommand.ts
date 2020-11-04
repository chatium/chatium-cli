import { CommandModule } from 'yargs'
import chalk from 'chalk'
import ora from 'ora'
import Table from 'cli-table3'

import { api } from 'api'

export const listCommand: CommandModule = {
  command: 'list',
  describe: 'List applications',
  handler: async () => {
    const spinner = ora('Fetching applications...').start()
    try {
      const response = await api.get('/api/dev/app')
      spinner.stop()

      const slugWidth = response.data.reduce((result: number, app: App) => Math.max(result, app.slug.length + 2), 0)
      const keyWidth = response.data.reduce((result: number, app: App) => Math.max(result, app.api_key.length + 2), 0)
      const secretWidth = response.data.reduce((result: number, app: App) => Math.max(result, app.api_secret.length + 2), 0)

      const table = new Table({
        head: ['Slug', 'Key', 'Secret'],
        colWidths: [slugWidth, keyWidth, secretWidth],
        style: { head: ['white']}
      })
      response.data.forEach((app: App) => table.push([app.slug, app.api_key, app.api_secret]))

      console.log(table.toString());
    } catch (e) {
      spinner.stop()
      console.log(chalk.red('– Error: ' + chalk.bold(e.message)))
    }
  }
}

interface App {
  slug: string
  api_key: string
  api_secret: string
}
