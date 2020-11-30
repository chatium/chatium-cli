"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommand = void 0;
const tslib_1 = require("tslib");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const execa_1 = tslib_1.__importDefault(require("execa"));
const ora_1 = tslib_1.__importDefault(require("ora"));
const rimraf_1 = tslib_1.__importDefault(require("rimraf"));
async function createCommand(options) {
    console.log(chalk_1.default.white('Create project', chalk_1.default.bold(options.name)));
    console.log();
    const folderSpinner = ora_1.default(chalk_1.default.white('Creating project folder', chalk_1.default.bold(options.path))).start();
    await execa_1.default('mkdir', [options.path]);
    folderSpinner.succeed(chalk_1.default.white('Folder', chalk_1.default.bold(options.path), 'created'));
    const cloneSpinner = ora_1.default(chalk_1.default.white('Downloading template from', chalk_1.default.bold(options.repo))).start();
    await execa_1.default('git', ['clone', options.repo, '.'], { cwd: options.path });
    rimraf_1.default.sync(options.path + '/.git');
    cloneSpinner.succeed(chalk_1.default.white('Template', chalk_1.default.bold(options.repo), 'downloaded'));
    const dependenciesSpinner = ora_1.default(chalk_1.default.white('Downloading dependencies...')).start();
    await execa_1.default('npm', ['install'], { cwd: options.path });
    dependenciesSpinner.succeed(chalk_1.default.white('Dependencies downloaded'));
    console.log('');
    console.log(chalk_1.default.white('Next steps:'));
    console.log(chalk_1.default.white('1. Go to project folder'));
    console.log(chalk_1.default.white('   ', chalk_1.default.bold(`cd ${options.name}`)));
    console.log('');
    console.log(chalk_1.default.white('2. Register application and save credentials'));
    console.log(chalk_1.default.white('   ', chalk_1.default.bold(`chatium app register --slug=${options.name} --save`)));
    console.log('');
    console.log(chalk_1.default.white('3. Start development server (port :5050 by default)'));
    console.log(chalk_1.default.white('   ', chalk_1.default.bold('npm run development')));
    console.log('');
    console.log(chalk_1.default.white('4. Start development tunnel if needed'));
    console.log(chalk_1.default.white('   ', chalk_1.default.bold('chatium tunnel 5050')));
}
exports.createCommand = createCommand;
//# sourceMappingURL=createCommand.js.map