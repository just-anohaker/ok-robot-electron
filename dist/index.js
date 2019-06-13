"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./base/Common"));
/// proxy
var user_1 = require("./proxies/user");
exports.ElectronUserProxy = user_1.default;
var auto_maker_1 = require("./proxies/auto_maker");
exports.ElectronAutoMakerProxy = auto_maker_1.default;
var auto_market_1 = require("./proxies/auto_market");
exports.ElectronAutoMarketProxy = auto_market_1.default;
var batch_order_1 = require("./proxies/batch_order");
exports.ElectronBatchOrderProxy = batch_order_1.default;
var take_order_1 = require("./proxies/take_order");
exports.ElectronTakeOrderProxy = take_order_1.default;
var okex_utils_1 = require("./proxies/okex_utils");
exports.ElectronOkexUtilsProxy = okex_utils_1.default;
// /> Application
var Application_1 = require("./Application");
exports.Application = Application_1.default;
