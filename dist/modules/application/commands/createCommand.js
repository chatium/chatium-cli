"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommand = void 0;
const tslib_1 = require("tslib");
const envfile_1 = require("envfile");
const fs_1 = tslib_1.__importDefault(require("fs"));
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const inquirer_1 = tslib_1.__importDefault(require("inquirer"));
const ora_1 = tslib_1.__importDefault(require("ora"));
const api_1 = require("../../../api");
exports.createCommand = {
    command: 'create [--name] [--description]',
    describe: 'Create new application',
    builder: (yargs) => yargs
        .options({
        slug: { type: 'string' },
        name: { type: 'string' },
        description: { type: 'string' },
        save: { type: 'boolean' },
    }),
    handler: async (args) => {
        var _a, _b;
        const prompt = await inquirer_1.default.prompt([
            {
                name: 'slug',
                message: 'Application slug (url part) (a-z0-9-)',
                when: !args.slug,
                validate(input) {
                    return input.length > 0;
                },
                transformer(input) {
                    return input.trim().toLowerCase();
                },
            },
            { name: 'name', message: 'Application name', when: !args.name },
            { name: 'description', message: 'Description', when: !args.description },
        ]);
        const payload = {
            slug: args.slug || prompt.slug,
            name: args.name || prompt.name,
            description: args.description || prompt.description,
        };
        const spinner = ora_1.default('Creating application...').start();
        try {
            const response = await api_1.api.post('/api/dev/app', payload);
            spinner.stop();
            console.log(chalk_1.default.green('+ Application created successful'));
            console.log('');
            console.log(chalk_1.default.green('       slug: ' + chalk_1.default.bold(response.data.slug)));
            console.log(chalk_1.default.green('    api_key: ' + chalk_1.default.bold(response.data.api_key)));
            console.log(chalk_1.default.green(' api_secret: ' + chalk_1.default.bold(response.data.api_secret)));
            console.log('');
            console.log(chalk_1.default.white('Use', chalk_1.default.cyan('chatium app list'), 'to show all yours applications.'));
            console.log('');
            if (args.save) {
                const data = fs_1.default.existsSync('.env') ? envfile_1.parse(fs_1.default.readFileSync('.env').toString()) : {};
                if (data.API_KEY && data.API_KEY !== response.data.api_key) {
                    console.log(chalk_1.default.white('Changed .env file API_KEY from', chalk_1.default.bold(data.API_KEY), 'to', chalk_1.default.bold(response.data.api_key)));
                }
                data.API_KEY = response.data.api_key;
                if (data.API_SECRET && data.API_SECRET !== response.data.api_secret) {
                    console.log(chalk_1.default.white('Changed .env file API_SECRET from', chalk_1.default.bold(data.API_SECRET), 'to', chalk_1.default.bold(response.data.api_secret)));
                }
                data.API_SECRET = response.data.api_secret;
                fs_1.default.writeFileSync('.env', envfile_1.stringify(data));
                console.log(chalk_1.default.green('+ Saved .env file'));
            }
        }
        catch (e) {
            spinner.stop();
            if ((_a = e.response) === null || _a === void 0 ? void 0 : _a.data.reason) {
                console.log(chalk_1.default.red('– Error: ' + chalk_1.default.bold((_b = e.response) === null || _b === void 0 ? void 0 : _b.data.reason)));
            }
            else {
                console.log(chalk_1.default.red('– Error: ' + chalk_1.default.bold(e.message)));
            }
        }
    }
};
//# sourceMappingURL=createCommand.js.map