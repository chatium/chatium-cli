"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = exports.setApiLocalBaseUrl = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const config_1 = require("../config");
let baseUrl = 'https://chatium.com';
function setApiLocalBaseUrl() {
    baseUrl = 'https://local.chatium.io';
}
exports.setApiLocalBaseUrl = setApiLocalBaseUrl;
const instance = axios_1.default.create();
instance.interceptors.request.use(function (data) {
    data.headers['accept'] = 'application/json, text/plain, */*, application/chatium.v1+json';
    data.headers['content-type'] = 'application/json;charset=UTF-8';
    data.headers['user-agent'] = 'Chatium CLI tool';
    data.headers['x-chatium-unique-id'] = config_1.config.uid;
    data.headers['x-chatium-unique-id'] = 'cli';
    data.headers['x-chatium-unique-id'] = '1.0.0';
    if (config_1.config.token) {
        data.headers['Authorization'] = 'Bearer ' + config_1.config.token;
    }
    data.baseURL = baseUrl;
    return data;
}, function (error) {
    return Promise.reject(error);
});
exports.api = {
    async get(url) {
        const response = await instance.get(url);
        return response.data;
    },
    async post(url, payload) {
        const response = await instance.post(url, payload);
        return response.data;
    },
};
//# sourceMappingURL=index.js.map