import { ipcMain, Event } from "electron";
import { apiTakeOrder, MaybeUndefined, MarkedMap } from "okrobot";

import IElectronProxy from "../../interfaces/electron-channel-proxy";
import { electronResponse, electronCatch } from "../../base/Common";
import EventBus from "../../base/EventBus";

enum TakeOrderChannel {
    generate = "batchorder.generate",
    start = "batchorder.start"
}

class ElectronTakeOrderProxy implements IElectronProxy {
    onReigster() {
        ipcMain.on(TakeOrderChannel.generate, this.generate);
        ipcMain.on(TakeOrderChannel.start, this.start);
    }

    onRemove() {

    }

    private readonly generate = (event: Event, args: MaybeUndefined<MarkedMap>): void => {
        apiTakeOrder.generate(args || {})
            .then(result => {
                electronResponse(event.sender, TakeOrderChannel.generate, result);
            })
            .catch(error => {
                electronCatch(event.sender, TakeOrderChannel.start, error.toString());
            });
    }

    private readonly start = (event: Event, args: MaybeUndefined<MarkedMap>): void => {
        apiTakeOrder.start(args || {})
            .then(result => {
                electronResponse(event.sender, TakeOrderChannel.start, result);
            })
            .catch(error => {
                electronCatch(event.sender, TakeOrderChannel.start, error.toString());
            });
    }
}

export default ElectronTakeOrderProxy;