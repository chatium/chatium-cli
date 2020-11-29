"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const checkCommand_1 = require("./commands/checkCommand");
const loginCommand_1 = require("./commands/loginCommand");
const logoutCommand_1 = require("./commands/logoutCommand");
exports.auth = {
    command: 'auth',
    describe: 'Login, logout, check',
    builder: (yargs) => yargs
        .command(loginCommand_1.loginCommand)
        .command(logoutCommand_1.logoutCommand)
        .command(checkCommand_1.checkCommand),
    handler: () => { },
};
//# sourceMappingURL=index.js.map