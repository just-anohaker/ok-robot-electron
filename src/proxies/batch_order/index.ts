import { ipcMain, Event } from "electron";
import { apiBatchOrder, MaybeUndefined, MarkedMap } from "okrobot";
import { IObserver, Observer, INotification } from "okrobot";
import { Facade } from "okrobot";

import IElectronProxy from "../../interfaces/electron-channel-proxy";
import { electronResponse, electronCatch } from "../../base/Common";
import EventBus from "../../base/EventBus";

const enum BatchOrderChannel {
    generate = "batchorder.generate",
    // start = "batchorder.start",
    cancel = "batchorder.cancel",
    limitOrder = "batchorder.limitOrder",
    marketOrder = "batchorder.marketOrder",
    icebergOrder = "batchorder.icebergOrder",
    startDepthInfo = "batchorder.startDepthInfo",
    stopDepthInfo = "batchorder.stopDepthInfo",
    getOrderData = "batchorder.getOrderData",
    toBatchOrder = "batchorder.toBatchOrder",
    addWarnings = "batchorder.addWarnings",
    removeWarnings = "batchorder.removeWarnings",
    isWarnings = "batchorder.isWarnings",
    startWarnings = "batchorder.startWarnings",
    stopWarnings = "batchorder.stopWarnings",
    listWarnings = "batchorder.listWarnings"
}

const enum BatchOrderEvents {
    depth = "depth",
    kDepthUSDT = "depth:ETM-USDT",
    kDepthUSDK = "depth:ETM-USDK"
};

class ElectronBatchOrderProxy implements IElectronProxy {
    private _observer?: IObserver;

    constructor() {
        this._observer = new Observer(this.onNotification, this);
    }

    onReigster() {
        ipcMain.on(BatchOrderChannel.generate, this.generate);
        // ipcMain.on(BatchOrderChannel.start, this.start);
        ipcMain.on(BatchOrderChannel.cancel, this.cancel);
        ipcMain.on(BatchOrderChannel.limitOrder, this.limitOrder);
        ipcMain.on(BatchOrderChannel.marketOrder, this.marketOrder);
        ipcMain.on(BatchOrderChannel.startDepthInfo, this.startDepthInfo);
        ipcMain.on(BatchOrderChannel.stopDepthInfo, this.stopDepthInfo);
        ipcMain.on(BatchOrderChannel.getOrderData, this.getOrderData);
        ipcMain.on(BatchOrderChannel.toBatchOrder, this.toBatchOrder);
        ipcMain.on(BatchOrderChannel.addWarnings, this.addWarnings);
        ipcMain.on(BatchOrderChannel.removeWarnings, this.removeWarnings);
        ipcMain.on(BatchOrderChannel.isWarnings, this.isWarnings);
        ipcMain.on(BatchOrderChannel.startWarnings, this.startWarnings);
        ipcMain.on(BatchOrderChannel.stopWarnings, this.stopWarnings);
        ipcMain.on(BatchOrderChannel.listWarnings, this.listWarnings);

        // Facade.getInstance().registerObserver(BatchOrderEvents.depth, this._observer!);
        Facade.getInstance().registerObserver(BatchOrderEvents.kDepthUSDT, this._observer!);
        Facade.getInstance().registerObserver(BatchOrderEvents.kDepthUSDK, this._observer!);

    }

    onRemove() {

    }

    private readonly generate = (event: Event, args: MaybeUndefined<MarkedMap>): void => {
        apiBatchOrder.generate(args || {})
            .then(result => {
                electronResponse(event.sender, BatchOrderChannel.generate, result);
            })
            .catch(error => {
                electronCatch(event.sender, BatchOrderChannel.generate, error.toString());
            });
    }

    // private readonly start = (event: Event, args: MaybeUndefined<MarkedMap>): void => {
    //     apiBatchOrder.start(args || {})
    //         .then(result => {
    //             electronResponse(event.sender, BatchOrderChannel.start, result);
    //         })
    //         .catch(error => {
    //             electronCatch(event.sender, BatchOrderChannel.start, error.toString());
    //         });
    // }

    private readonly cancel = (event: Event, args: MaybeUndefined<MarkedMap>): void => {
        apiBatchOrder.cancel(args || {})
            .then(result => {
                electronResponse(event.sender, BatchOrderChannel.cancel, result);
            })
            .catch(error => {
                electronCatch(event.sender, BatchOrderChannel.cancel, error.toString());
            });
    }

    private readonly limitOrder = (event: Event, args: MaybeUndefined<MarkedMap>): void => {
        apiBatchOrder.limitOrder(args || {})
            .then(result => {
                electronResponse(event.sender, BatchOrderChannel.limitOrder, result);
            })
            .catch(error => {
                electronCatch(event.sender, BatchOrderChannel.limitOrder, error.toString());
            });
    }

    private readonly marketOrder = (event: Event, args: MaybeUndefined<MarkedMap>): void => {
        apiBatchOrder.marketOrder(args || {})
            .then(result => {
                electronResponse(event.sender, BatchOrderChannel.marketOrder, result);
            })
            .catch(error => {
                electronCatch(event.sender, BatchOrderChannel.marketOrder, error.toString());
            });
    }

    private readonly icebergOrder = (event: Event, args: MaybeUndefined<MarkedMap>): void => {
        // apiBatchOrder.icebergOrder(args || {})
        //     .then(result => {
        //         electronResponse(event.sender, BatchOrderChannel.icebergOrder, result);
        //     })
        //     .catch(error => {
        //         electronCatch(event.sender, BatchOrderChannel.icebergOrder, error.toString());
        //     });
    }

    private readonly startDepthInfo = (event: Event, args: MaybeUndefined<MarkedMap>): void => {
        apiBatchOrder.startDepInfo(args || {})
            .then(result => {
                electronResponse(event.sender, BatchOrderChannel.startDepthInfo, result);
            })
            .catch(error => {
                electronCatch(event.sender, BatchOrderChannel.startDepthInfo, error.toString());
            });
    }

    private readonly stopDepthInfo = (event: Event, args: MaybeUndefined<MarkedMap>): void => {
        apiBatchOrder.stopDepInfo(args || {})
            .then(result => {
                electronResponse(event.sender, BatchOrderChannel.stopDepthInfo, result);
            })
            .catch(error => {
                electronCatch(event.sender, BatchOrderChannel.stopDepthInfo, error.toString());
            });
    }

    private readonly getOrderData = (event: Event, args: MaybeUndefined<MarkedMap>): void => {
        apiBatchOrder.getOrderData(args || {})
            .then(result => {
                electronResponse(event.sender, BatchOrderChannel.getOrderData, result);
            })
            .catch(error => {
                electronCatch(event.sender, BatchOrderChannel.stopDepthInfo, error.toString());
            });
    }

    private readonly toBatchOrder = (event: Event, args: MaybeUndefined<MarkedMap>): void => {
        apiBatchOrder.toBatchOrder(args || {})
            .then(result => {
                electronResponse(event.sender, BatchOrderChannel.toBatchOrder, result);
            })
            .catch(error => {
                electronCatch(event.sender, BatchOrderChannel.toBatchOrder, error.toString());
            });
    }

    private readonly addWarnings = (event: Event, args: MaybeUndefined<MarkedMap>): void => {
        apiBatchOrder.addWarnings(args || {})
            .then(result => {
                electronResponse(event.sender, BatchOrderChannel.addWarnings, result);
            })
            .catch(error => {
                electronCatch(event.sender, BatchOrderChannel.addWarnings, error.toString());
            });
    }

    private readonly removeWarnings = (event: Event, args: MaybeUndefined<MarkedMap>): void => {
        apiBatchOrder.removeWarnings(args || {})
            .then(result => {
                electronResponse(event.sender, BatchOrderChannel.removeWarnings, result);
            })
            .catch(error => {
                electronCatch(event.sender, BatchOrderChannel.removeWarnings, error.toString());
            });
    }

    private readonly isWarnings = (event: Event, args: MaybeUndefined<MarkedMap>): void => {
        apiBatchOrder.isWarnings(args || {})
            .then(result => {
                electronResponse(event.sender, BatchOrderChannel.isWarnings, result);
            })
            .catch(error => {
                electronCatch(event.sender, BatchOrderChannel.isWarnings, error.toString());
            });
    }

    private readonly startWarnings = (event: Event, args: MaybeUndefined<MarkedMap>): void => {
        apiBatchOrder.startWarnings(args || {})
            .then(result => {
                electronResponse(event.sender, BatchOrderChannel.startWarnings, result);
            })
            .catch(error => {
                electronCatch(event.sender, BatchOrderChannel.startWarnings, error.toString());
            });
    }

    private readonly stopWarnings = (event: Event, args: MaybeUndefined<MarkedMap>): void => {
        apiBatchOrder.stopWarnings(args || {})
            .then(result => {
                electronResponse(event.sender, BatchOrderChannel.stopWarnings, result);
            })
            .catch(error => {
                electronCatch(event.sender, BatchOrderChannel.stopWarnings, error.toString());
            });
    }

    private readonly listWarnings = (event: Event, args: MaybeUndefined<MarkedMap>): void => {
        apiBatchOrder.listWarnings(args || {})
            .then(result => {
                electronResponse(event.sender, BatchOrderChannel.listWarnings, result);
            })
            .catch(error => {
                electronCatch(event.sender, BatchOrderChannel.listWarnings, error.toString());
            });
    }

    private readonly onNotification = (notification: INotification): void => {
        // console.log("[BatchOrderAPI] onNotification:", notification.getName());
        EventBus.getInstance().emit(notification.getName(), notification.getBody());
    }
}

export default ElectronBatchOrderProxy;