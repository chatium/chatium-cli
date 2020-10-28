"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutCommand = void 0;
const tslib_1 = require("tslib");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const config_1 = require("../../../config");
async function logoutCommand() {
    config_1.storeConfig({ token: null });
    console.log(chalk_1.default.green('+ Logout successful'));
}
exports.logoutCommand = logoutCommand;
//# sourceMappingURL=logoutCommand.js.map