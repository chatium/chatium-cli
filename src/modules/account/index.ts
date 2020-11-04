import yargs from 'yargs'
import { listCommand } from './commands/listCommand'
import { selectCommand } from './commands/selectCommand'

export function account(yargs: yargs.Argv) {
  yargs
    .command('list', 'List accounts', listCommand)
    .command('select', 'Select account for manage', async (yargs) => selectCommand(
      { name: yargs.demandCommand(1).parse()['_'].pop()! }
    ))
}
