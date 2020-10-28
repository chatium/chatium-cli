import chalk from 'chalk'
import { customAlphabet, urlAlphabet } from 'nanoid'
import open from 'open'
import ora from 'ora'
import io from "socket.io-client"
import { storeConfig } from 'config'

interface Options {
  local: boolean
}

export async function loginCommand(options: Options) {
  const spinner = ora('Waiting auth approve...')

  const token = customAlphabet(urlAlphabet, 32)()

  const socketHost = options.local
    ? 'https://local.chatium.io'
    : 'https://app.chatium.io'

  const tokenUrl = options.local
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
  })
}
