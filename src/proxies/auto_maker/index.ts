import { ipcMain, Event } from "electron";
import { apiAutoMaker, MaybeUndefined, MarkedMap } from "okrobot";

import IElectronProxy from "../../interfaces/electron-channel-proxy";
import { electronResponse, electronCatch } from "../../base/Common";
import EventBus from "../../base/EventBus";

enum AutoMakerChannel {
    init = "automaker.init",
    start = "automaker.start",
    stop = "automaker.stop",
    isRunning = "automaker.isRunning",
    getOptionsAndAccount = "automaker.getOptionsAndAccount"
}

class ElectronAutoMakerProxy implements IElectronProxy {
    onReigster() {
        ipcMain.on(AutoMakerChannel.init, this.init);
        ipcMain.on(AutoMakerChannel.start, this.start);
        ipcMain.on(AutoMakerChannel.stop, this.stop);
        ipcMain.on(AutoMakerChannel.isRunning, this.isRunning);
        ipcMain.on(AutoMakerChannel.getOptionsAndAccount, this.getOptionsAndAccount);
    }

    onRemove() {

    }

    private readonly init = (event: Event, args: MaybeUndefined<MarkedMap>): void => {
        apiAutoMaker.init(args || {})
            .then(result => {
                electronResponse(event.sender, AutoMakerChannel.init, result);
            })
            .catch(error => {
                electronCatch(event.sender, AutoMakerChannel.init, error.toString());
            });
    }

    private readonly start = (event: Event, args: MaybeUndefined<MarkedMap>): void => {
        apiAutoMaker.start()
            .then(result => {
                electronResponse(event.sender, AutoMakerChannel.start, result);
            })
            .catch(error => {
                electronCatch(event.sender, AutoMakerChannel.start, error.toString());
            });
    }

    private readonly stop = (event: Event, args: MaybeUndefined<MarkedMap>): void => {
        apiAutoMaker.stop()
            .then(result => {
                electronResponse(event.sender, AutoMakerChannel.stop, result);
            })
            .catch(error => {
                electronCatch(event.sender, AutoMakerChannel.stop, error.toString());
            });
    }

    private readonly isRunning = (event: Event, args: MaybeUndefined<MarkedMap>): void => {
        apiAutoMaker.isrunning()
            .then(result => {
                electronResponse(event.sender, AutoMakerChannel.isRunning, result);
            })
            .catch(error => {
                electronCatch(event.sender, AutoMakerChannel.isRunning, error.toString());
            });
    }

    private readonly getOptionsAndAccount = (event: Event, args: MaybeUndefined<MarkedMap>): void => {
        apiAutoMaker.optionAndAccount()
            .then(result => {
                electronResponse(event.sender, AutoMakerChannel.getOptionsAndAccount, result);
            })
            .catch(error => {
                electronCatch(event.sender, AutoMakerChannel.getOptionsAndAccount, error.toString());
            });
    }
}

export default ElectronAutoMakerProxy;