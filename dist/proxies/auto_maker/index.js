"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const okrobot_1 = require("okrobot");
const Common_1 = require("../../base/Common");
var AutoMakerChannel;
(function (AutoMakerChannel) {
    AutoMakerChannel["init"] = "automaker.init";
    AutoMakerChannel["start"] = "automaker.start";
    AutoMakerChannel["stop"] = "automaker.stop";
    AutoMakerChannel["isRunning"] = "automaker.isRunning";
    AutoMakerChannel["getOptionsAndAccount"] = "automaker.getOptionsAndAccount";
})(AutoMakerChannel || (AutoMakerChannel = {}));
class ElectronAutoMakerProxy {
    constructor() {
        this.init = (event, args) => {
            okrobot_1.apiAutoMaker.init(args || {})
                .then(result => {
                Common_1.electronResponse(event.sender, AutoMakerChannel.init, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, AutoMakerChannel.init, error.toString());
            });
        };
        this.start = (event, args) => {
            okrobot_1.apiAutoMaker.start()
                .then(result => {
                Common_1.electronResponse(event.sender, AutoMakerChannel.start, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, AutoMakerChannel.start, error.toString());
            });
        };
        this.stop = (event, args) => {
            okrobot_1.apiAutoMaker.stop()
                .then(result => {
                Common_1.electronResponse(event.sender, AutoMakerChannel.stop, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, AutoMakerChannel.stop, error.toString());
            });
        };
        this.isRunning = (event, args) => {
            okrobot_1.apiAutoMaker.isrunning()
                .then(result => {
                Common_1.electronResponse(event.sender, AutoMakerChannel.isRunning, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, AutoMakerChannel.isRunning, error.toString());
            });
        };
        this.getOptionsAndAccount = (event, args) => {
            okrobot_1.apiAutoMaker.optionAndAccount()
                .then(result => {
                Common_1.electronResponse(event.sender, AutoMakerChannel.getOptionsAndAccount, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, AutoMakerChannel.getOptionsAndAccount, error.toString());
            });
        };
    }
    onReigster() {
        electron_1.ipcMain.on(AutoMakerChannel.init, this.init);
        electron_1.ipcMain.on(AutoMakerChannel.start, this.start);
        electron_1.ipcMain.on(AutoMakerChannel.stop, this.stop);
        electron_1.ipcMain.on(AutoMakerChannel.isRunning, this.isRunning);
        electron_1.ipcMain.on(AutoMakerChannel.getOptionsAndAccount, this.getOptionsAndAccount);
    }
    onRemove() {
    }
}
exports.default = ElectronAutoMakerProxy;
