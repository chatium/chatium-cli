"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tunnel = void 0;
const nanoid_1 = require("nanoid");
const openCommand_1 = require("./commands/openCommand");
function tunnel(yargs) {
    const options = yargs.options({
        server: { type: 'string', default: 'wss://lt.chatium.io' },
        domain: { type: 'string', default: nanoid_1.customAlphabet('qwertyuiopasdfghjklzxcvbnm1234567890', 8)() },
    }).parse();
    const port = parseInt(yargs.demandCommand(1).parse()['_'].pop());
    openCommand_1.openCommand({
        server: options.server,
        domain: options.domain,
        port
    });
}
exports.tunnel = tunnel;
//# sourceMappingURL=index.js.map