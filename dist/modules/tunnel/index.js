"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tunnel = void 0;
const nanoid_1 = require("nanoid");
const openCommand_1 = require("./commands/openCommand");
exports.tunnel = {
    command: 'tunnel <port>',
    describe: 'Websocket tunnel client for convenient Chatium app development',
    builder: (yargs) => yargs
        .demandCommand(1)
        .options({
        server: {
            type: 'string',
            default: 'wss://lt.chatium.io',
            description: 'Custom websocket server',
        },
        domain: {
            type: 'string',
            default: nanoid_1.customAlphabet('qwertyuiopasdfghjklzxcvbnm1234567890', 8)(),
            description: 'Custom domain prefix (default random generated)',
        },
    }),
    handler: async (args) => {
        const port = parseInt(args._.pop());
        await openCommand_1.openCommand({
            server: args.server,
            domain: args.domain,
            port
        });
    }
};
//# sourceMappingURL=index.js.map