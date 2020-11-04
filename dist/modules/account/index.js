"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.account = void 0;
const listCommand_1 = require("./commands/listCommand");
const selectCommand_1 = require("./commands/selectCommand");
exports.account = {
    command: 'account',
    aliases: 'acc',
    describe: 'Manage accounts',
    builder: (yargs) => yargs
        .command(listCommand_1.listCommand)
        .command(selectCommand_1.selectCommand),
    handler: (args) => console.log('account', args)
};
//# sourceMappingURL=index.js.map