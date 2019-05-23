"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./base/Common"));
/// proxy
var user_1 = require("./proxies/user");
exports.ElectronUserProxy = user_1.default;
// /> Application
var Application_1 = require("./Application");
exports.Application = Application_1.default;
