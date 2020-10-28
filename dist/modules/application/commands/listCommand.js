"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listCommand = void 0;
const tslib_1 = require("tslib");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const ora_1 = tslib_1.__importDefault(require("ora"));
const api_1 = require("../../../api");
const cli_table3_1 = tslib_1.__importDefault(require("cli-table3"));
async function listCommand() {
    const spinner = ora_1.default('Fetching applications...').start();
    try {
        const response = await api_1.api.get('/api/dev/app');
        spinner.stop();
        const slugWidth = response.data.reduce((result, app) => Math.max(result, app.slug.length + 2), 0);
        const keyWidth = response.data.reduce((result, app) => Math.max(result, app.api_key.length + 2), 0);
        const secretWidth = response.data.reduce((result, app) => Math.max(result, app.api_secret.length + 2), 0);
        const table = new cli_table3_1.default({
            head: ['Slug', 'Key', 'Secret'],
            colWidths: [slugWidth, keyWidth, secretWidth],
            style: { head: ['white'] }
        });
        response.data.forEach((app) => table.push([app.slug, app.api_key, app.api_secret]));
        console.log(table.toString());
    }
    catch (e) {
        spinner.stop();
        console.log(chalk_1.default.red('– Error: ' + chalk_1.default.bold(e.message)));
    }
}
exports.listCommand = listCommand;
//# sourceMappingURL=listCommand.js.map