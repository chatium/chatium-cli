"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.application = void 0;
const registerCommand_1 = require("./commands/registerCommand");
const listCommand_1 = require("./commands/listCommand");
exports.application = {
    command: 'app',
    describe: 'Manage applications',
    builder: yargs => yargs
        .command(registerCommand_1.registerCommand)
        .command(listCommand_1.listCommand),
    handler: () => { }
};
//# sourceMappingURL=index.js.map