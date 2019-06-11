"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const okrobot_1 = require("okrobot");
const Common_1 = require("../../base/Common");
class ElectronTakeOrderProxy {
    constructor() {
        this.generate = (event, args) => {
            okrobot_1.apiTakeOrder.generate(args || {})
                .then(result => {
                Common_1.electronResponse(event.sender, "batchorder.generate" /* generate */, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, "batchorder.start" /* start */, error.toString());
            });
        };
        this.start = (event, args) => {
            okrobot_1.apiTakeOrder.start(args || {})
                .then(result => {
                Common_1.electronResponse(event.sender, "batchorder.start" /* start */, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, "batchorder.start" /* start */, error.toString());
            });
        };
    }
    onReigster() {
        electron_1.ipcMain.on("batchorder.generate" /* generate */, this.generate);
        electron_1.ipcMain.on("batchorder.start" /* start */, this.start);
    }
    onRemove() {
    }
}
exports.default = ElectronTakeOrderProxy;
