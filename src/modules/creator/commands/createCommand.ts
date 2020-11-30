import chalk from 'chalk'
import execa from 'execa'
import ora from 'ora'
import rimraf from 'rimraf'

interface Options {
  name: string
  path: string
  repo: string
}

export async function createCommand(options: Options) {
  console.log(chalk.white('Create project', chalk.bold(options.name)))
  console.log()

  const folderSpinner = ora(chalk.white('Creating project folder', chalk.bold(options.path))).start()
  await execa('mkdir', [options.path])
  folderSpinner.succeed(chalk.white('Folder', chalk.bold(options.path), 'created'))

  const cloneSpinner = ora(chalk.white('Downloading template from', chalk.bold(options.repo))).start()
  await execa('git', ['clone', options.repo, '.'], { cwd: options.path })
  rimraf.sync(options.path + '/.git')
  cloneSpinner.succeed(chalk.white('Template', chalk.bold(options.repo), 'downloaded'))

  const dependenciesSpinner = ora(chalk.white('Downloading dependencies...')).start()
  await execa('npm', ['install'], { cwd: options.path })
  dependenciesSpinner.succeed(chalk.white('Dependencies downloaded'))

  console.log('')
  console.log(chalk.white('Next steps:'))
  console.log(chalk.white('1. Go to project folder'))
  console.log(chalk.white('   ', chalk.bold(`cd ${options.name}`)))
  console.log('')
  console.log(chalk.white('2. Register application and store credentials'))
  console.log(chalk.white('   ', chalk.bold(`chatium app create --slug=${options.name} --save`)))
  console.log('')
  console.log(chalk.white('3. Start development server'))
  console.log(chalk.white('   ', chalk.bold('npm run development')))
  console.log('')
  console.log(chalk.white('4. Start development tunnel if needed'))
  console.log(chalk.white('   ', chalk.bold('chatium tunnel 5050')))
}
