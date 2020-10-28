"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const checkCommand_1 = require("./commnads/checkCommand");
const loginCommand_1 = require("./commnads/loginCommand");
const logoutCommand_1 = require("./commnads/logoutCommand");
function auth(yargs) {
    yargs
        .command('login [--local]', 'Login', async (yargs) => loginCommand_1.loginCommand(yargs.options({
        local: { type: 'boolean', default: false, hidden: true },
    }).parse()))
        .command('logout', 'Logout', logoutCommand_1.logoutCommand)
        .command('check', 'Check auth', checkCommand_1.checkCommand);
}
exports.auth = auth;
//# sourceMappingURL=index.js.map