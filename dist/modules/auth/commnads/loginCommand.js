"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginCommand = void 0;
const tslib_1 = require("tslib");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const nanoid_1 = require("nanoid");
const open_1 = tslib_1.__importDefault(require("open"));
const ora_1 = tslib_1.__importDefault(require("ora"));
const socket_io_client_1 = tslib_1.__importDefault(require("socket.io-client"));
const config_1 = require("../../../config");
async function loginCommand(options) {
    const spinner = ora_1.default('Waiting auth approve...');
    const token = nanoid_1.customAlphabet(nanoid_1.urlAlphabet, 32)();
    const socketHost = options.local
        ? 'https://local.chatium.io'
        : 'https://app.chatium.io';
    const tokenUrl = options.local
        ? `https://local.chatium.io/auth/code/${token}`
        : `https://chatium.com/auth/code/${token}`;
    const socket = socket_io_client_1.default.connect(socketHost);
    socket.on('connect', async () => {
        console.log('Visit', chalk_1.default.cyan(tokenUrl), 'to authorize');
        socket.emit(`dataSocket/subscribe`, { id: `auth-${token}` });
        socket.on(`dataSocket/data/auth-${token}`, (data) => {
            spinner.stop();
            socket.close();
            if (data.success) {
                console.log(chalk_1.default.green('+ Successful authorized as'), chalk_1.default.cyan([data.firstName, data.lastName].join(' ')));
            }
            else {
                console.log(chalk_1.default.red('– Authorization fail'));
            }
            config_1.storeConfig({ token: data.token });
        });
        setTimeout(async () => {
            await open_1.default(tokenUrl);
            spinner.start();
        }, 1000);
    });
}
exports.loginCommand = loginCommand;
//# sourceMappingURL=loginCommand.js.map