import { ipcMain, Event } from "electron";
import { apiBatchOrder, MaybeUndefined, MarkedMap } from "okrobot";

import IElectronProxy from "../../interfaces/electron-channel-proxy";
import { electronResponse, electronCatch } from "../../base/Common";
import EventBus from "../../base/EventBus";

enum BatchOrderChannel {
    generate = "batchorder.generate",
    // start = "batchorder.start",
    cancel = "batchorder.cancel",
    limitOrder = "batchorder.limitOrder",
    marketOrder = "batchorder.marketOrder"
}

class ElectronBatchOrderProxy implements IElectronProxy {
    onReigster() {
        ipcMain.on(BatchOrderChannel.generate, this.generate);
        // ipcMain.on(BatchOrderChannel.start, this.start);
        ipcMain.on(BatchOrderChannel.cancel, this.cancel);
        ipcMain.on(BatchOrderChannel.limitOrder, this.limitOrder);
        ipcMain.on(BatchOrderChannel.marketOrder, this.marketOrder);
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
}

export default ElectronBatchOrderProxy;