"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const okrobot_1 = require("okrobot");
const Common_1 = require("../../base/Common");
class ElectronAutoMakerProxy {
    constructor() {
        this.init = (event, args) => {
            okrobot_1.apiAutoMaker.init(args || {})
                .then(result => {
                Common_1.electronResponse(event.sender, "automaker.init" /* init */, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, "automaker.init" /* init */, error.toString());
            });
        };
        this.start = (event, args) => {
            okrobot_1.apiAutoMaker.start()
                .then(result => {
                Common_1.electronResponse(event.sender, "automaker.start" /* start */, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, "automaker.start" /* start */, error.toString());
            });
        };
        this.stop = (event, args) => {
            okrobot_1.apiAutoMaker.stop()
                .then(result => {
                Common_1.electronResponse(event.sender, "automaker.stop" /* stop */, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, "automaker.stop" /* stop */, error.toString());
            });
        };
        this.isRunning = (event, args) => {
            okrobot_1.apiAutoMaker.isrunning()
                .then(result => {
                Common_1.electronResponse(event.sender, "automaker.isRunning" /* isRunning */, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, "automaker.isRunning" /* isRunning */, error.toString());
            });
        };
        this.getOptionsAndAccount = (event, args) => {
            okrobot_1.apiAutoMaker.optionAndAccount()
                .then(result => {
                Common_1.electronResponse(event.sender, "automaker.getOptionsAndAccount" /* getOptionsAndAccount */, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, "automaker.getOptionsAndAccount" /* getOptionsAndAccount */, error.toString());
            });
        };
        this.getOrderInfo = (event, args) => {
            okrobot_1.apiAutoMaker.getOrderInfo(args || {})
                .then(result => {
                Common_1.electronResponse(event.sender, "automaker.getOrderInfo" /* getOrderInfo */, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, "automaker.getOrderInfo" /* getOrderInfo */, error.toString());
            });
        };
    }
    onReigster() {
        electron_1.ipcMain.on("automaker.init" /* init */, this.init);
        electron_1.ipcMain.on("automaker.start" /* start */, this.start);
        electron_1.ipcMain.on("automaker.stop" /* stop */, this.stop);
        electron_1.ipcMain.on("automaker.isRunning" /* isRunning */, this.isRunning);
        electron_1.ipcMain.on("automaker.getOptionsAndAccount" /* getOptionsAndAccount */, this.getOptionsAndAccount);
        electron_1.ipcMain.on("automaker.getOrderInfo" /* getOrderInfo */, this.getOrderInfo);
    }
    onRemove() {
    }
}
exports.default = ElectronAutoMakerProxy;
