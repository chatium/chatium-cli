import yargs from 'yargs'
import { createCommand } from './commands/createCommand'
import { listCommand } from './commands/listCommand'

export function application(yargs: yargs.Argv) {
  yargs
    .command('create [--name] [--description]', 'Create new application', (yargs) => createCommand(
      yargs
        .options({
          slug: { type: 'string' },
          name: { type: 'string' },
          description: { type: 'string' },
        })
        .parse()
    ))
    .command('list', 'List applications', listCommand)
}
