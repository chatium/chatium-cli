import { closeAllLocalConnections } from '../utils/localConnectionsRegistry'
import ResilientWsClient from '../utils/ResilientWsClient'
import { routeIncommingWsMessage } from '../utils/tunnelWsRouter'

interface Options {
  server: string
  domain: string
  port: number
}

export async function openCommand(options: Options) {
  console.log(';OPEN')
  const ws: ResilientWsClient = new ResilientWsClient(`${options.server}/tunnel`, {
    tunnelLocalPort: options.port,
    requestArgs: {
      headers: {
        authorization: 'stub-auth',
        'x-tunnel-domain': options.domain,
      },
    },
    onclose: () => closeAllLocalConnections(),
    onmessage: event => routeIncommingWsMessage(event.data, ws),
  })
}
