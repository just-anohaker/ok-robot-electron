import { ipcMain, Event } from "electron";
import { apiBatchOrder, MaybeUndefined, MarkedMap } from "okrobot";

import IElectronProxy from "../../interfaces/electron-channel-proxy";
import { electronResponse, electronCatch } from "../../base/Common";
import EventBus from "../../base/EventBus";

const enum TakeOrderChannel {
    getSpotTrade = "okex_utils.getSpotTrade",
    getSpotCandles = "okex_utils.getSpotCandles"
}

class ElectronOkexUtilsProxy implements IElectronProxy {
    onReigster() {
        ipcMain.on(TakeOrderChannel.getSpotTrade, this.getSpotTrade);
        ipcMain.on(TakeOrderChannel.getSpotCandles, this.getSpotCandles);
    }

    onRemove() {

    }

    private readonly getSpotTrade = (event: Event, args: MaybeUndefined<MarkedMap>): void => {
        apiBatchOrder.getTradeData(args || {})
            .then(result => {
                electronResponse(event.sender, TakeOrderChannel.getSpotTrade, result);
            })
            .catch(error => {
                electronCatch(event.sender, TakeOrderChannel.getSpotTrade, error.toString());
            });
    }

    private readonly getSpotCandles = (event: Event, args: MaybeUndefined<MarkedMap>): void => {
        apiBatchOrder.getCandlesData(args || {})
            .then(result => {
                electronResponse(event.sender, TakeOrderChannel.getSpotCandles, result);
            })
            .catch(error => {
                electronCatch(event.sender, TakeOrderChannel.getSpotCandles, error.toString());
            });
    }
}

export default ElectronOkexUtilsProxy;