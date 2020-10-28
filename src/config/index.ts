import * as fs from 'fs'
import { nanoid } from 'nanoid'

const configFilePath = require('os').homedir() + '/.chatium'

interface Config {
  uid: string
  token: string | null
  account: string | null
}

export const config: Config = {
  uid: nanoid(32),
  token: null,
  account: null,
}

export function loadConfig(): Config {
  const config = {
    uid: 'cli-' + nanoid(32),
    account: null,
    token: null,
  }

  if (fs.existsSync(configFilePath)) {
    const data = JSON.parse(fs.readFileSync(configFilePath).toString())

    config.uid = data.uid || config.uid
    config.account = data.account || config.account
    config.token = data.token || config.token
  }

  storeConfig(config)

  return config
}

export function storeConfig(data: Partial<Config> = {}) {
  config.uid = data.uid || config.uid
  config.account = data.account || config.account
  config.token = data.token || config.token

  fs.writeFileSync(configFilePath, JSON.stringify(config))
}
