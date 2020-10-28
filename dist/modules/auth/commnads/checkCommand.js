"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCommand = void 0;
const tslib_1 = require("tslib");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const config_1 = require("../../../config");
const api_1 = require("../../../api");
const ora_1 = tslib_1.__importDefault(require("ora"));
async function checkCommand() {
    if (config_1.config.token === null) {
        console.log(chalk_1.default.red('– Not authorized'));
    }
    else {
        const spinner = ora_1.default('Checking authorization...').start();
        try {
            const response = await api_1.api.get('/api/dev/auth');
            spinner.stop();
            if (response.success) {
                const name = [response.data.auth.first_name, response.data.auth.last_name].join(' ');
                console.log(chalk_1.default.green('+ Authorized as'), chalk_1.default.green.bold(name));
            }
            else {
                console.log(chalk_1.default.red('– Invalid credentials'));
            }
        }
        catch (e) {
            spinner.stop();
            console.log(chalk_1.default.red('– Invalid credentials:', chalk_1.default.bold(e.message)));
        }
    }
}
exports.checkCommand = checkCommand;
//# sourceMappingURL=checkCommand.js.map