"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectCommand = void 0;
const tslib_1 = require("tslib");
const api_1 = require("../../../api");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const index_1 = require("../../../config/index");
const ora_1 = tslib_1.__importDefault(require("ora"));
async function selectCommand(options) {
    const spinner = ora_1.default('Check account...').start();
    try {
        const response = await api_1.api.get('/api/dev/account');
        spinner.stop();
        const existsAccount = response.data.find((a) => a.name === options.name);
        if (!existsAccount) {
            console.log(chalk_1.default.red('– Account', chalk_1.default.bold(options.name), ' not found'));
        }
        index_1.storeConfig({ ...index_1.config, account: options.name });
        console.log(chalk_1.default.green('+ Current account is'), chalk_1.default.bold(options.name));
    }
    catch (e) {
        spinner.stop();
        console.log(chalk_1.default.red('– Error: ' + chalk_1.default.bold(e.message)));
    }
}
exports.selectCommand = selectCommand;
//# sourceMappingURL=selectCommand.js.map