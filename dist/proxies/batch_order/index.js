"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const okrobot_1 = require("okrobot");
const Common_1 = require("../../base/Common");
var BatchOrderChannel;
(function (BatchOrderChannel) {
    BatchOrderChannel["generate"] = "batchorder.generate";
    // start = "batchorder.start",
    BatchOrderChannel["cancel"] = "batchorder.cancel";
    BatchOrderChannel["limitOrder"] = "batchorder.limitOrder";
    BatchOrderChannel["marketOrder"] = "batchorder.marketOrder";
    BatchOrderChannel["startDepthOrder"] = "batchorder.startDepthOrder";
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
        // private readonly start = (event: Event, args: MaybeUndefined<MarkedMap>): void => {
        //     apiBatchOrder.start(args || {})
        //         .then(result => {
        //             electronResponse(event.sender, BatchOrderChannel.start, result);
        //         })
        //         .catch(error => {
        //             electronCatch(event.sender, BatchOrderChannel.start, error.toString());
        //         });
        // }
        this.cancel = (event, args) => {
            okrobot_1.apiBatchOrder.cancel(args || {})
                .then(result => {
                Common_1.electronResponse(event.sender, BatchOrderChannel.cancel, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, BatchOrderChannel.cancel, error.toString());
            });
        };
        this.limitOrder = (event, args) => {
            okrobot_1.apiBatchOrder.limitOrder(args || {})
                .then(result => {
                Common_1.electronResponse(event.sender, BatchOrderChannel.limitOrder, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, BatchOrderChannel.limitOrder, error.toString());
            });
        };
        this.marketOrder = (event, args) => {
            okrobot_1.apiBatchOrder.marketOrder(args || {})
                .then(result => {
                Common_1.electronResponse(event.sender, BatchOrderChannel.marketOrder, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, BatchOrderChannel.marketOrder, error.toString());
            });
        };
        this.startDepthOrder = (event, args) => {
            okrobot_1.apiBatchOrder.startDepInfo(args || {})
                .then(result => {
                Common_1.electronResponse(event.sender, BatchOrderChannel.startDepthOrder, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, BatchOrderChannel.startDepthOrder, error.toString());
            });
        };
    }
    onReigster() {
        electron_1.ipcMain.on(BatchOrderChannel.generate, this.generate);
        // ipcMain.on(BatchOrderChannel.start, this.start);
        electron_1.ipcMain.on(BatchOrderChannel.cancel, this.cancel);
        electron_1.ipcMain.on(BatchOrderChannel.limitOrder, this.limitOrder);
        electron_1.ipcMain.on(BatchOrderChannel.marketOrder, this.marketOrder);
        electron_1.ipcMain.on(BatchOrderChannel.startDepthOrder, this.startDepthOrder);
    }
    onRemove() {
    }
}
exports.default = ElectronBatchOrderProxy;
