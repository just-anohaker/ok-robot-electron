"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const okrobot_1 = require("okrobot");
const okrobot_2 = require("okrobot");
const okrobot_3 = require("okrobot");
const Common_1 = require("../../base/Common");
const EventBus_1 = __importDefault(require("../../base/EventBus"));
;
class ElectronBatchOrderProxy {
    constructor() {
        this.generate = (event, args) => {
            okrobot_1.apiBatchOrder.generate(args || {})
                .then(result => {
                Common_1.electronResponse(event.sender, "batchorder.generate" /* generate */, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, "batchorder.generate" /* generate */, error.toString());
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
                Common_1.electronResponse(event.sender, "batchorder.cancel" /* cancel */, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, "batchorder.cancel" /* cancel */, error.toString());
            });
        };
        this.limitOrder = (event, args) => {
            okrobot_1.apiBatchOrder.limitOrder(args || {})
                .then(result => {
                Common_1.electronResponse(event.sender, "batchorder.limitOrder" /* limitOrder */, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, "batchorder.limitOrder" /* limitOrder */, error.toString());
            });
        };
        this.marketOrder = (event, args) => {
            okrobot_1.apiBatchOrder.marketOrder(args || {})
                .then(result => {
                Common_1.electronResponse(event.sender, "batchorder.marketOrder" /* marketOrder */, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, "batchorder.marketOrder" /* marketOrder */, error.toString());
            });
        };
        this.icebergOrder = (event, args) => {
            // apiBatchOrder.icebergOrder(args || {})
            //     .then(result => {
            //         electronResponse(event.sender, BatchOrderChannel.icebergOrder, result);
            //     })
            //     .catch(error => {
            //         electronCatch(event.sender, BatchOrderChannel.icebergOrder, error.toString());
            //     });
        };
        this.startDepthInfo = (event, args) => {
            okrobot_1.apiBatchOrder.startDepInfo(args || {})
                .then(result => {
                Common_1.electronResponse(event.sender, "batchorder.startDepthInfo" /* startDepthInfo */, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, "batchorder.startDepthInfo" /* startDepthInfo */, error.toString());
            });
        };
        this.stopDepthInfo = (event, args) => {
            okrobot_1.apiBatchOrder.stopDepInfo(args || {})
                .then(result => {
                Common_1.electronResponse(event.sender, "batchorder.stopDepthInfo" /* stopDepthInfo */, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, "batchorder.stopDepthInfo" /* stopDepthInfo */, error.toString());
            });
        };
        this.getOrderData = (event, args) => {
            okrobot_1.apiBatchOrder.getOrderData(args || {})
                .then(result => {
                Common_1.electronResponse(event.sender, "batchorder.getOrderData" /* getOrderData */, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, "batchorder.stopDepthInfo" /* stopDepthInfo */, error.toString());
            });
        };
        this.toBatchOrder = (event, args) => {
            okrobot_1.apiBatchOrder.toBatchOrder(args || {})
                .then(result => {
                Common_1.electronResponse(event.sender, "batchorder.toBatchOrder" /* toBatchOrder */, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, "batchorder.toBatchOrder" /* toBatchOrder */, error.toString());
            });
        };
        this.addWarnings = (event, args) => {
            okrobot_1.apiBatchOrder.addWarnings(args || {})
                .then(result => {
                Common_1.electronResponse(event.sender, "batchorder.addWarnings" /* addWarnings */, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, "batchorder.addWarnings" /* addWarnings */, error.toString());
            });
        };
        this.removeWarnings = (event, args) => {
            okrobot_1.apiBatchOrder.removeWarnings(args || {})
                .then(result => {
                Common_1.electronResponse(event.sender, "batchorder.removeWarnings" /* removeWarnings */, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, "batchorder.removeWarnings" /* removeWarnings */, error.toString());
            });
        };
        this.isWarnings = (event, args) => {
            okrobot_1.apiBatchOrder.isWarnings(args || {})
                .then(result => {
                Common_1.electronResponse(event.sender, "batchorder.isWarnings" /* isWarnings */, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, "batchorder.isWarnings" /* isWarnings */, error.toString());
            });
        };
        this.startWarnings = (event, args) => {
            okrobot_1.apiBatchOrder.startWarnings(args || {})
                .then(result => {
                Common_1.electronResponse(event.sender, "batchorder.startWarnings" /* startWarnings */, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, "batchorder.startWarnings" /* startWarnings */, error.toString());
            });
        };
        this.stopWarnings = (event, args) => {
            okrobot_1.apiBatchOrder.stopWarnings(args || {})
                .then(result => {
                Common_1.electronResponse(event.sender, "batchorder.stopWarnings" /* stopWarnings */, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, "batchorder.stopWarnings" /* stopWarnings */, error.toString());
            });
        };
        this.listWarnings = (event, args) => {
            okrobot_1.apiBatchOrder.listWarnings(args || {})
                .then(result => {
                Common_1.electronResponse(event.sender, "batchorder.listWarnings" /* listWarnings */, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, "batchorder.listWarnings" /* listWarnings */, error.toString());
            });
        };
        this.onNotification = (notification) => {
            // console.log("[BatchOrderAPI] onNotification:", notification.getName());
            EventBus_1.default.getInstance().emit(notification.getName(), notification.getBody());
        };
        this._observer = new okrobot_2.Observer(this.onNotification, this);
    }
    onReigster() {
        electron_1.ipcMain.on("batchorder.generate" /* generate */, this.generate);
        // ipcMain.on(BatchOrderChannel.start, this.start);
        electron_1.ipcMain.on("batchorder.cancel" /* cancel */, this.cancel);
        electron_1.ipcMain.on("batchorder.limitOrder" /* limitOrder */, this.limitOrder);
        electron_1.ipcMain.on("batchorder.marketOrder" /* marketOrder */, this.marketOrder);
        electron_1.ipcMain.on("batchorder.startDepthInfo" /* startDepthInfo */, this.startDepthInfo);
        electron_1.ipcMain.on("batchorder.stopDepthInfo" /* stopDepthInfo */, this.stopDepthInfo);
        electron_1.ipcMain.on("batchorder.getOrderData" /* getOrderData */, this.getOrderData);
        electron_1.ipcMain.on("batchorder.toBatchOrder" /* toBatchOrder */, this.toBatchOrder);
        electron_1.ipcMain.on("batchorder.addWarnings" /* addWarnings */, this.addWarnings);
        electron_1.ipcMain.on("batchorder.removeWarnings" /* removeWarnings */, this.removeWarnings);
        electron_1.ipcMain.on("batchorder.isWarnings" /* isWarnings */, this.isWarnings);
        electron_1.ipcMain.on("batchorder.startWarnings" /* startWarnings */, this.startWarnings);
        electron_1.ipcMain.on("batchorder.stopWarnings" /* stopWarnings */, this.stopWarnings);
        electron_1.ipcMain.on("batchorder.listWarnings" /* listWarnings */, this.listWarnings);
        // Facade.getInstance().registerObserver(BatchOrderEvents.depth, this._observer!);
        okrobot_3.Facade.getInstance().registerObserver("depth:ETM-USDT" /* kDepthUSDT */, this._observer);
        okrobot_3.Facade.getInstance().registerObserver("depth:ETM-USDK" /* kDepthUSDK */, this._observer);
    }
    onRemove() {
    }
}
exports.default = ElectronBatchOrderProxy;
