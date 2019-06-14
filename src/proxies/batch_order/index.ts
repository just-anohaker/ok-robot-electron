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
}

const enum BatchOrderEvents {
    depth = "depth",
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

        Facade.getInstance().registerObserver(BatchOrderEvents.depth, this._observer!);
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

    private readonly onNotification = (notification: INotification): void => {
        // console.log("[BatchOrderAPI] onNotification:", notification.getName());
        EventBus.getInstance().emit(notification.getName(), notification.getBody());
    }
}

export default ElectronBatchOrderProxy;