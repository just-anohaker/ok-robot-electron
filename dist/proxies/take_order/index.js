"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const okrobot_1 = require("okrobot");
const Common_1 = require("../../base/Common");
var TakeOrderChannel;
(function (TakeOrderChannel) {
    TakeOrderChannel["generate"] = "batchorder.generate";
    TakeOrderChannel["start"] = "batchorder.start";
})(TakeOrderChannel || (TakeOrderChannel = {}));
class ElectronTakeOrderProxy {
    constructor() {
        this.generate = (event, args) => {
            okrobot_1.apiTakeOrder.generate(args || {})
                .then(result => {
                Common_1.electronResponse(event.sender, TakeOrderChannel.generate, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, TakeOrderChannel.start, error.toString());
            });
        };
        this.start = (event, args) => {
            okrobot_1.apiTakeOrder.start(args || {})
                .then(result => {
                Common_1.electronResponse(event.sender, TakeOrderChannel.start, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, TakeOrderChannel.start, error.toString());
            });
        };
    }
    onReigster() {
        electron_1.ipcMain.on(TakeOrderChannel.generate, this.generate);
        electron_1.ipcMain.on(TakeOrderChannel.start, this.start);
    }
    onRemove() {
    }
}
exports.default = ElectronTakeOrderProxy;
