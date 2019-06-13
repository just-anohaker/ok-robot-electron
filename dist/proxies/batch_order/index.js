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
        this.pageInfo = (event, args) => {
            okrobot_1.apiBatchOrder.pageInfo(args || {})
                .then(result => {
                Common_1.electronResponse(event.sender, "batchorder.pageInfo" /* pageInfo */, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, "batchorder.pageInfo" /* pageInfo */, error.toString());
            });
        };
        this.pageKline = (event, args) => {
            okrobot_1.apiBatchOrder.pageKline(args || {})
                .then(result => {
                Common_1.electronResponse(event.sender, "batchorder.pageKline" /* pageKline */, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, "batchorder.pageKline" /* pageKline */, error.toString());
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
        electron_1.ipcMain.on("batchorder.pageInfo" /* pageInfo */, this.pageInfo);
        electron_1.ipcMain.on("batchorder.pageKline" /* pageKline */, this.pageKline);
        okrobot_3.Facade.getInstance().registerObserver("depth" /* depth */, this._observer);
        okrobot_3.Facade.getInstance().registerObserver("page/candle:ETM-USDK" /* Candle_ETM_USDK */, this._observer);
        okrobot_3.Facade.getInstance().registerObserver("page/candle:ETM-USDT" /* Candle_ETM_USDT */, this._observer);
        okrobot_3.Facade.getInstance().registerObserver("page/ticker:ETM-USDK" /* Ticker_ETM_USDK */, this._observer);
        okrobot_3.Facade.getInstance().registerObserver("page/ticker:ETM-USDT" /* Ticker_ETM_USDT */, this._observer);
        okrobot_3.Facade.getInstance().registerObserver("page/trade:ETM-USDK" /* Trade_ETM_USDK */, this._observer);
        okrobot_3.Facade.getInstance().registerObserver("page/trade:ETM-USDT" /* Trade_ETM_USDT */, this._observer);
    }
    onRemove() {
    }
}
exports.default = ElectronBatchOrderProxy;
