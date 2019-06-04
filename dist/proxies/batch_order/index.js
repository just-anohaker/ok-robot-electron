"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const okrobot_1 = require("okrobot");
const Common_1 = require("../../base/Common");
var BatchOrderChannel;
(function (BatchOrderChannel) {
    BatchOrderChannel["generate"] = "batchorder.generate";
    BatchOrderChannel["start"] = "batchorder.start";
})(BatchOrderChannel || (BatchOrderChannel = {}));
class ElectronBatchOrderProxy {
    constructor() {
        this.generate = (event, args) => {
            okrobot_1.apiBatchOrder.generate(args || {})
                .then(result => {
                Common_1.electronResponse(event.sender, BatchOrderChannel.generate, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, BatchOrderChannel.generate, error.toString());
            });
        };
        this.start = (event, args) => {
            okrobot_1.apiBatchOrder.start(args || {})
                .then(result => {
                Common_1.electronResponse(event.sender, BatchOrderChannel.start, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, BatchOrderChannel.start, error.toString());
            });
        };
    }
    onReigster() {
        electron_1.ipcMain.on(BatchOrderChannel.generate, this.generate);
        electron_1.ipcMain.on(BatchOrderChannel.start, this.start);
    }
    onRemove() {
    }
}
exports.default = ElectronBatchOrderProxy;