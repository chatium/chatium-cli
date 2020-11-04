"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectCommand = void 0;
const tslib_1 = require("tslib");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const ora_1 = tslib_1.__importDefault(require("ora"));
const api_1 = require("../../../api");
const index_1 = require("../../../config/index");
exports.selectCommand = {
    command: 'select',
    describe: 'Select account for manage',
    builder: (yargs) => yargs.demandCommand(1),
    handler: async (args) => {
        const name = args._.pop();
        const spinner = ora_1.default('Check account...').start();
        try {
            const response = await api_1.api.get('/api/dev/account');
            spinner.stop();
            const existsAccount = response.data.find((a) => a.name === name);
            if (!existsAccount) {
                console.log(chalk_1.default.red('– Account', chalk_1.default.bold(name), ' not found'));
            }
            index_1.storeConfig({ ...index_1.config, account: name });
            console.log(chalk_1.default.green('+ Current account is'), chalk_1.default.bold(name));
        }
        catch (e) {
            spinner.stop();
            console.log(chalk_1.default.red('– Error: ' + chalk_1.default.bold(e.message)));
        }
    }
};
//# sourceMappingURL=selectCommand.js.map