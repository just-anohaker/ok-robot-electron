"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const okrobot_1 = require("okrobot");
const Common_1 = require("../../base/Common");
var AutoMarketChannel;
(function (AutoMarketChannel) {
    AutoMarketChannel["init"] = "automarket.init";
    AutoMarketChannel["start"] = "automarket.start";
    AutoMarketChannel["stop"] = "automarket.stop";
    AutoMarketChannel["isRunning"] = "automarket.isRunning";
    AutoMarketChannel["getOptionsAndAccount"] = "automarket.getOptionsAndAccount";
})(AutoMarketChannel || (AutoMarketChannel = {}));
class ElectronAutoMarketProxy {
    constructor() {
        this.init = (event, args) => {
            okrobot_1.apiAutoMarket.init(args || {})
                .then(result => {
                Common_1.electronResponse(event.sender, AutoMarketChannel.init, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, AutoMarketChannel.init, error.toString());
            });
        };
        this.start = (event, args) => {
            okrobot_1.apiAutoMarket.start()
                .then(result => {
                Common_1.electronResponse(event.sender, AutoMarketChannel.start, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, AutoMarketChannel.start, error.toString());
            });
        };
        this.stop = (event, args) => {
            okrobot_1.apiAutoMarket.stop()
                .then(result => {
                Common_1.electronResponse(event.sender, AutoMarketChannel.stop, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, AutoMarketChannel.stop, error.toString());
            });
        };
        this.isRunning = (event, args) => {
            okrobot_1.apiAutoMarket.isrunning()
                .then(result => {
                Common_1.electronResponse(event.sender, AutoMarketChannel.isRunning, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, AutoMarketChannel.isRunning, error.toString());
            });
        };
        this.getOptionsAndAccount = (event, args) => {
            okrobot_1.apiAutoMarket.optionAndAccount()
                .then(result => {
                Common_1.electronResponse(event.sender, AutoMarketChannel.getOptionsAndAccount, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, AutoMarketChannel.getOptionsAndAccount, error.toString());
            });
        };
    }
    onReigster() {
        electron_1.ipcMain.on(AutoMarketChannel.init, this.init);
        electron_1.ipcMain.on(AutoMarketChannel.start, this.start);
        electron_1.ipcMain.on(AutoMarketChannel.stop, this.stop);
        electron_1.ipcMain.on(AutoMarketChannel.isRunning, this.isRunning);
        electron_1.ipcMain.on(AutoMarketChannel.getOptionsAndAccount, this.getOptionsAndAccount);
    }
    onRemove() {
    }
}
exports.default = ElectronAutoMarketProxy;
