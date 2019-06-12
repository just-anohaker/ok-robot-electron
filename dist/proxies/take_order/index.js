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
                Common_1.electronResponse(event.sender, "takeorder.generate" /* generate */, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, "takeorder.start" /* start */, error.toString());
            });
        };
        this.start = (event, args) => {
            okrobot_1.apiTakeOrder.start(args || {})
                .then(result => {
                Common_1.electronResponse(event.sender, "takeorder.start" /* start */, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, "takeorder.start" /* start */, error.toString());
            });
        };
    }
    onReigster() {
        electron_1.ipcMain.on("takeorder.generate" /* generate */, this.generate);
        electron_1.ipcMain.on("takeorder.start" /* start */, this.start);
    }
    onRemove() {
    }
}
exports.default = ElectronTakeOrderProxy;
