"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const okrobot_1 = require("okrobot");
const Common_1 = require("../../base/Common");
class ElectronOkexUtilsProxy {
    constructor() {
        this.getSpotTrade = (event, args) => {
            okrobot_1.apiOkexUtils.getSpotTrade(args || {})
                .then(result => {
                Common_1.electronResponse(event.sender, "okex_utils.getSpotTrade" /* getSpotTrade */, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, "okex_utils.getSpotTrade" /* getSpotTrade */, error.toString());
            });
        };
        this.getSpotCandles = (event, args) => {
            okrobot_1.apiOkexUtils.getSpotCandles(args || {})
                .then(result => {
                Common_1.electronResponse(event.sender, "okex_utils.getSpotCandles" /* getSpotCandles */, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, "okex_utils.getSpotCandles" /* getSpotCandles */, error.toString());
            });
        };
        this.getWallet = (event, args) => {
            okrobot_1.apiOkexUtils.getWallet(args || {})
                .then(result => {
                Common_1.electronResponse(event.sender, "okex_utils.getWallet" /* getWallet */, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, "okex_utils.getWallet" /* getWallet */, error.toString());
            });
        };
        this.getWalletList = (event, args) => {
            okrobot_1.apiOkexUtils.getWalletList(args || {})
                .then(result => {
                Common_1.electronResponse(event.sender, "okex_utils.getWalletList" /* getWalletList */, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, "okex_utils.getWalletList" /* getWalletList */, error.toString());
            });
        };
    }
    onReigster() {
        electron_1.ipcMain.on("okex_utils.getSpotTrade" /* getSpotTrade */, this.getSpotTrade);
        electron_1.ipcMain.on("okex_utils.getSpotCandles" /* getSpotCandles */, this.getSpotCandles);
        electron_1.ipcMain.on("okex_utils.getWallet" /* getWallet */, this.getWallet);
        electron_1.ipcMain.on("okex_utils.getWalletList" /* getWalletList */, this.getWalletList);
    }
    onRemove() {
    }
}
exports.default = ElectronOkexUtilsProxy;
