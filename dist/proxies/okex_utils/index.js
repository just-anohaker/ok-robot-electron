"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const okrobot_1 = require("okrobot");
const Common_1 = require("../../base/Common");
class ElectronOkexUtilsProxy {
    constructor() {
        this.getSpotTrade = (event, args) => {
            okrobot_1.apiBatchOrder.getTradeData(args || {})
                .then(result => {
                Common_1.electronResponse(event.sender, "okex_utils.getSpotTrade" /* getSpotTrade */, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, "okex_utils.getSpotTrade" /* getSpotTrade */, error.toString());
            });
        };
        this.getSpotCandles = (event, args) => {
            okrobot_1.apiBatchOrder.getCandlesData(args || {})
                .then(result => {
                Common_1.electronResponse(event.sender, "okex_utils.getSpotCandles" /* getSpotCandles */, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, "okex_utils.getSpotCandles" /* getSpotCandles */, error.toString());
            });
        };
    }
    onReigster() {
        electron_1.ipcMain.on("okex_utils.getSpotTrade" /* getSpotTrade */, this.getSpotTrade);
        electron_1.ipcMain.on("okex_utils.getSpotCandles" /* getSpotCandles */, this.getSpotCandles);
    }
    onRemove() {
    }
}
exports.default = ElectronOkexUtilsProxy;
