"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.creator = void 0;
const createCommand_1 = require("./commands/createCommand");
exports.creator = {
    command: 'create <name>',
    describe: 'Create chatium backend from template',
    builder: (yargs) => yargs
        .options({
        name: { type: 'string' }
    }),
    handler: async (args) => {
        await createCommand_1.createCommand({
            name: args.name,
            path: process.cwd() + '/' + args.name,
            repo: 'git@github.com:chatium/node-sdk-template.git'
        });
    }
};
//# sourceMappingURL=index.js.map