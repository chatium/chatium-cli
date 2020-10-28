"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.application = void 0;
const createCommand_1 = require("./commands/createCommand");
const listCommand_1 = require("./commands/listCommand");
function application(yargs) {
    yargs
        .command('create [--name] [--description]', 'Create new application', (yargs) => createCommand_1.createCommand(yargs
        .options({
        slug: { type: 'string' },
        name: { type: 'string' },
        description: { type: 'string' },
    })
        .parse()))
        .command('list', 'List applications', listCommand_1.listCommand);
}
exports.application = application;
//# sourceMappingURL=index.js.map