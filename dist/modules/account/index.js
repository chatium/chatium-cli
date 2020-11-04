"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.account = void 0;
const listCommand_1 = require("./commands/listCommand");
const selectCommand_1 = require("./commands/selectCommand");
function account(yargs) {
    yargs
        .command('list', 'List accounts', listCommand_1.listCommand)
        .command('select', 'Select account for manage', async (yargs) => selectCommand_1.selectCommand({ name: yargs.demandCommand(1).parse()['_'].pop() }));
}
exports.account = account;
//# sourceMappingURL=index.js.map