"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanArgs = exports.camelize = void 0;
function camelize(text) {
    return text.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '');
}
exports.camelize = camelize;
// commander passes the Command object itself as options,
// extract only actual options into a fresh object.
function cleanArgs(cmd) {
    const args = {};
    cmd.options.forEach((o) => {
        const key = camelize(o.long.replace(/^--/, ''));
        // if an option is not present and Command has a method with the same name
        // it should not be copied
        if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
            // @ts-ignore
            args[key] = cmd[key];
        }
    });
    return args;
}
exports.cleanArgs = cleanArgs;
//# sourceMappingURL=args.js.map