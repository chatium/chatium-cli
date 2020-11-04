#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const yargs_1 = tslib_1.__importDefault(require("yargs"));
const config_1 = require("./config");
const api_1 = require("./api");
const auth_1 = require("./modules/auth");
const application_1 = require("./modules/application");
const account_1 = require("./modules/account");
const tunnel_1 = require("./modules/tunnel");
config_1.loadConfig();
const args = yargs_1.default(process.argv.slice(2))
    .options('local', { hidden: true })
    .command('auth', 'Login, logout, check', auth_1.auth)
    .command('app', 'Manage applications', application_1.application)
    .command(account_1.account)
    .command('tunnel', 'Dev tunnel', tunnel_1.tunnel)
    .help()
    .epilogue('for more information, find our manual at https://chatium.com')
    .showHelpOnFail(true)
    .locale('en')
    .parse();
if (args.local) {
    api_1.setApiLocalBaseUrl();
}
//# sourceMappingURL=main.js.map