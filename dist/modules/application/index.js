"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.application = void 0;
const createCommand_1 = require("./commands/createCommand");
const listCommand_1 = require("./commands/listCommand");
exports.application = {
    command: 'app',
    describe: 'Manage applications',
    builder: yargs => yargs
        .command(createCommand_1.createCommand)
        .command(listCommand_1.listCommand),
    handler: () => { }
};
//# sourceMappingURL=index.js.map