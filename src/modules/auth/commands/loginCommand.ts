import chalk from 'chalk'
import { storeConfig } from 'config'
import { customAlphabet, urlAlphabet } from 'nanoid'
import open from 'open'
import ora from 'ora'
import io from 'socket.io-client'
import { CommandModule } from 'yargs'

export const loginCommand: CommandModule = {
  command: 'login',
  describe: 'Login',
  builder: yargs => yargs
    .options({
      local: { type: 'boolean', default: false, hidden: true },
    }),
  handler: async (args) => {
    const spinner = ora('Waiting auth approve...')

    const token = customAlphabet(urlAlphabet, 32)()

    const socketHost = args.local
      ? 'https://local.chatium.io'
      : 'https://app.chatium.io'

    const tokenUrl = args.local
      ? `https://local.chatium.io/auth/code/${token}`
      : `https://chatium.com/auth/code/${token}`

    const socket = io.connect(socketHost)
    socket.on('connect', async () => {
      console.log('Visit', chalk.cyan(tokenUrl), 'to authorize')

      socket.emit(`dataSocket/subscribe`, { id: `auth-${token}` });
      socket.on(`dataSocket/data/auth-${token}`, (data: { success: boolean, firstName: string, lastName: string, token: string }) => {
        spinner.stop()
        socket.close()

        if (data.success) {
          console.log(chalk.green('+ Successful authorized as'), chalk.cyan([data.firstName, data.lastName].join(' ')))
        } else {
          console.log(chalk.red('– Authorization fail'))
        }

        storeConfig({ token: data.token })
      })

      setTimeout(async () => {
        await open(tokenUrl)
        spinner.start()
      }, 1000)

      socket.on('error', (error: Error) => {
        console.log(chalk.red('– Socket error:'), error.message)
      });
    })
  }
}
