"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openCommand = void 0;
const tslib_1 = require("tslib");
const localConnectionsRegistry_1 = require("../utils/localConnectionsRegistry");
const ResilientWsClient_1 = tslib_1.__importDefault(require("../utils/ResilientWsClient"));
const tunnelWsRouter_1 = require("../utils/tunnelWsRouter");
async function openCommand(options) {
    const ws = new ResilientWsClient_1.default(`${options.server}/tunnel`, {
        tunnelLocalPort: options.port,
        requestArgs: {
            headers: {
                authorization: 'stub-auth',
                'x-tunnel-domain': options.domain,
            },
        },
        onclose: () => localConnectionsRegistry_1.closeAllLocalConnections(),
        onmessage: event => tunnelWsRouter_1.routeIncommingWsMessage(event.data, ws),
    });
}
exports.openCommand = openCommand;
//# sourceMappingURL=openCommand.js.map