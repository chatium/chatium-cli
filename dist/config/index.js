"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeConfig = exports.loadConfig = exports.config = void 0;
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs"));
const nanoid_1 = require("nanoid");
const configFilePath = require('os').homedir() + '/.chatium';
exports.config = {
    uid: nanoid_1.nanoid(32),
    token: null,
    account: null,
};
function loadConfig() {
    const config = {
        uid: 'cli-' + nanoid_1.nanoid(32),
        account: null,
        token: null,
    };
    if (fs.existsSync(configFilePath)) {
        const data = JSON.parse(fs.readFileSync(configFilePath).toString());
        config.uid = data.uid || config.uid;
        config.account = data.account || config.account;
        config.token = data.token || config.token;
    }
    storeConfig(config);
    return config;
}
exports.loadConfig = loadConfig;
function storeConfig(data = {}) {
    exports.config.uid = data.uid || exports.config.uid;
    exports.config.account = data.account || exports.config.account;
    exports.config.token = data.token || exports.config.token;
    fs.writeFileSync(configFilePath, JSON.stringify(exports.config));
}
exports.storeConfig = storeConfig;
//# sourceMappingURL=index.js.map