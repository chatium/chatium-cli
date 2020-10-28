#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const yargs_1 = tslib_1.__importDefault(require("yargs"));
const config_1 = require("./config");
const application_1 = require("./modules/application");
const auth_1 = require("./modules/auth");
config_1.loadConfig();
yargs_1.default(process.argv.slice(2))
    .command('auth', 'Login, logout, check', auth_1.auth)
    .command('app', 'Create app', application_1.application)
    .parse();
//# sourceMappingURL=main.js.map