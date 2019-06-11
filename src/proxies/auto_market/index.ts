import { ipcMain, Event } from "electron";
import { apiAutoMarket, MaybeUndefined, MarkedMap } from "okrobot";

import IElectronProxy from "../../interfaces/electron-channel-proxy";
import { electronResponse, electronCatch } from "../../base/Common";
import EventBus from "../../base/EventBus";

const enum AutoMarketChannel {
    init = "automarket.init",
    start = "automarket.start",
    stop = "automarket.stop",
    isRunning = "automarket.isRunning",
    getOptionsAndAccount = "automarket.getOptionsAndAccount"
}

class ElectronAutoMarketProxy implements IElectronProxy {
    onReigster() {
        ipcMain.on(AutoMarketChannel.init, this.init);
        ipcMain.on(AutoMarketChannel.start, this.start);
        ipcMain.on(AutoMarketChannel.stop, this.stop);
        ipcMain.on(AutoMarketChannel.isRunning, this.isRunning);
        ipcMain.on(AutoMarketChannel.getOptionsAndAccount, this.getOptionsAndAccount);
    }

    onRemove() {

    }

    private readonly init = (event: Event, args: MaybeUndefined<MarkedMap>): void => {
        apiAutoMarket.init(args || {})
            .then(result => {
                electronResponse(event.sender, AutoMarketChannel.init, result);
            })
            .catch(error => {
                electronCatch(event.sender, AutoMarketChannel.init, error.toString());
            });
    }

    private readonly start = (event: Event, args: MaybeUndefined<MarkedMap>): void => {
        apiAutoMarket.start()
            .then(result => {
                electronResponse(event.sender, AutoMarketChannel.start, result);
            })
            .catch(error => {
                electronCatch(event.sender, AutoMarketChannel.start, error.toString());
            });
    }

    private readonly stop = (event: Event, args: MaybeUndefined<MarkedMap>): void => {
        apiAutoMarket.stop()
            .then(result => {
                electronResponse(event.sender, AutoMarketChannel.stop, result);
            })
            .catch(error => {
                electronCatch(event.sender, AutoMarketChannel.stop, error.toString());
            });
    }

    private readonly isRunning = (event: Event, args: MaybeUndefined<MarkedMap>): void => {
        apiAutoMarket.isrunning()
            .then(result => {
                electronResponse(event.sender, AutoMarketChannel.isRunning, result);
            })
            .catch(error => {
                electronCatch(event.sender, AutoMarketChannel.isRunning, error.toString());
            });
    }

    private readonly getOptionsAndAccount = (event: Event, args: MaybeUndefined<MarkedMap>): void => {
        apiAutoMarket.optionAndAccount()
            .then(result => {
                electronResponse(event.sender, AutoMarketChannel.getOptionsAndAccount, result);
            })
            .catch(error => {
                electronCatch(event.sender, AutoMarketChannel.getOptionsAndAccount, error.toString());
            });
    }
}

export default ElectronAutoMarketProxy;