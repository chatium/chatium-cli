import chalk from 'chalk'
import ora from 'ora'
import { api } from 'api'
import Table from 'cli-table3'

export async function listCommand() {
  const spinner = ora('Fetching accounts...').start()
  try {
    const response = await api.get('/api/dev/account')
    spinner.stop()

    const nameWidth = response.data.reduce((result: number, app: Account) => Math.max(result, app.name.length + 2), 0)
    const titleWidth = response.data.reduce((result: number, app: Account) => Math.max(result, app.title.length + 2), 0)

    const table = new Table({
      head: ['Name', 'Title'],
      colWidths: [nameWidth, Math.max(60, titleWidth)],
      style: { head: ['white']}
    })
    response.data.forEach((app: Account) => table.push([app.name, app.title]))

    console.log(table.toString());
  } catch (e) {
    spinner.stop()
    console.log(chalk.red('– Error: ' + chalk.bold(e.message)))
  }
}

interface Account {
  name: string
  title: string
}
