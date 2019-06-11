"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const okrobot_1 = require("okrobot");
const Common_1 = require("../../base/Common");
class ElectronAutoMarketProxy {
    constructor() {
        this.init = (event, args) => {
            okrobot_1.apiAutoMarket.init(args || {})
                .then(result => {
                Common_1.electronResponse(event.sender, "automarket.init" /* init */, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, "automarket.init" /* init */, error.toString());
            });
        };
        this.start = (event, args) => {
            okrobot_1.apiAutoMarket.start()
                .then(result => {
                Common_1.electronResponse(event.sender, "automarket.start" /* start */, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, "automarket.start" /* start */, error.toString());
            });
        };
        this.stop = (event, args) => {
            okrobot_1.apiAutoMarket.stop()
                .then(result => {
                Common_1.electronResponse(event.sender, "automarket.stop" /* stop */, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, "automarket.stop" /* stop */, error.toString());
            });
        };
        this.isRunning = (event, args) => {
            okrobot_1.apiAutoMarket.isrunning()
                .then(result => {
                Common_1.electronResponse(event.sender, "automarket.isRunning" /* isRunning */, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, "automarket.isRunning" /* isRunning */, error.toString());
            });
        };
        this.getOptionsAndAccount = (event, args) => {
            okrobot_1.apiAutoMarket.optionAndAccount()
                .then(result => {
                Common_1.electronResponse(event.sender, "automarket.getOptionsAndAccount" /* getOptionsAndAccount */, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, "automarket.getOptionsAndAccount" /* getOptionsAndAccount */, error.toString());
            });
        };
    }
    onReigster() {
        electron_1.ipcMain.on("automarket.init" /* init */, this.init);
        electron_1.ipcMain.on("automarket.start" /* start */, this.start);
        electron_1.ipcMain.on("automarket.stop" /* stop */, this.stop);
        electron_1.ipcMain.on("automarket.isRunning" /* isRunning */, this.isRunning);
        electron_1.ipcMain.on("automarket.getOptionsAndAccount" /* getOptionsAndAccount */, this.getOptionsAndAccount);
    }
    onRemove() {
    }
}
exports.default = ElectronAutoMarketProxy;
