import { ipcMain, Event } from "electron";
import { apiOkexMonit, MaybeUndefined, MarkedMap } from "okrobot";
import { IObserver, Observer, INotification } from "okrobot";
import { Facade } from "okrobot";

import IElectronProxy from "../../interfaces/electron-channel-proxy";
import { electronResponse, electronCatch } from "../../base/Common";
import EventBus from "../../base/EventBus";

const enum OkexMonitorChannel {
    monitSpotTrade = "okex_monitor.spotTrade",
    unmonitSpotTrade = "okex_monitor.spotTrade.unmonit",
    monitSpotTicker = "okex_monitor.spotTicker",
    unmonitSpotTicker = "okex_monitor.spotTicker.unmonit",
    monitSpotChannel = "okex_monitor.spotChannel",
    unmonitSpotChannel = "okex_monitor.spotChannel.unmonit"
}

class ElectronOkexMonitProxy implements IElectronProxy {
    private _observer?: IObserver;
    private _channelNames: Map<string, number>;

    constructor() {
        this._observer = new Observer(this.onNotification, this);
        this._channelNames = new Map<string, number>();
    }

    onReigster() {
        ipcMain.on(OkexMonitorChannel.monitSpotTrade, this.monitSpotTrade);
        ipcMain.on(OkexMonitorChannel.unmonitSpotTrade, this.unmonitSpotTrade);
        ipcMain.on(OkexMonitorChannel.monitSpotTicker, this.monitSpotTicker);
        ipcMain.on(OkexMonitorChannel.unmonitSpotTicker, this.unmonitSpotTicker);
        ipcMain.on(OkexMonitorChannel.monitSpotChannel, this.monitSpotChannel);
        ipcMain.on(OkexMonitorChannel.unmonitSpotChannel, this.unmonitSpotChannel);
    }

    onRemove() {

    }

    private _registerObserver(eventName: string): void {
        if (!this._channelNames.has(eventName)) {
            console.log("registerObserver:", eventName);
            Facade.getInstance().registerObserver(eventName, this._observer!);
            this._channelNames.set(eventName, 1);
        } else {
            this._channelNames.set(eventName, this._channelNames.get(eventName)! + 1);
        }
    }

    private _unregisterObserver(eventName: string): void {
        if (!this._channelNames.has(eventName)) {
            return;
        }
        const count = this._channelNames.get(eventName)!;
        if (count > 1) {
            this._channelNames.set(eventName, count - 1);
            return;
        }

        console.log("unregisterObserver:", eventName);
        Facade.getInstance().removeObserver(eventName, this);
        this._channelNames.delete(eventName);
    }

    private readonly monitSpotTrade = (event: Event, args: MaybeUndefined<MarkedMap>): void => {
        apiOkexMonit.monitSpotTrade(args || {})
            .then(result => {
                if (result.success) {
                    const eventName = result.result as string;
                    this._registerObserver(eventName);
                }
                electronResponse(event.sender, OkexMonitorChannel.monitSpotTrade, result);
            })
            .catch(error => {
                electronCatch(event.sender, OkexMonitorChannel.monitSpotTrade, error.toString());
            });
    }

    private readonly unmonitSpotTrade = (event: Event, args: MaybeUndefined<MarkedMap>): void => {
        apiOkexMonit.unmonitSpotTrade(args || {})
            .then(result => {
                if (result.success) {
                    const eventName = result.result as string;
                    this._unregisterObserver(eventName);
                }
                electronResponse(event.sender, OkexMonitorChannel.unmonitSpotTrade, result);
            })
            .catch(error => {
                electronCatch(event.sender, OkexMonitorChannel.unmonitSpotTrade, error.toString());
            });
    }

    private readonly monitSpotTicker = (event: Event, args: MaybeUndefined<MarkedMap>): void => {
        apiOkexMonit.monitSpotTicker(args || {})
            .then(result => {
                if (result.success) {
                    const eventName = result.result as string;
                    this._registerObserver(eventName);
                }
                electronResponse(event.sender, OkexMonitorChannel.monitSpotTicker, result);
            })
            .catch(error => {
                electronCatch(event.sender, OkexMonitorChannel.monitSpotTicker, error.toString());
            });
    }

    private readonly unmonitSpotTicker = (event: Event, args: MaybeUndefined<MarkedMap>): void => {
        apiOkexMonit.unmonitSpotTicker(args || {})
            .then(result => {
                if (result.success) {
                    const eventName = result.result as string;
                    this._unregisterObserver(eventName);
                }
                electronResponse(event.sender, OkexMonitorChannel.unmonitSpotTicker, result);
            })
            .catch(error => {
                electronCatch(event.sender, OkexMonitorChannel.unmonitSpotTicker, error.toString());
            });
    }

    private readonly monitSpotChannel = (event: Event, args: MaybeUndefined<MarkedMap>): void => {
        apiOkexMonit.monitSpotChannel(args || {})
            .then(result => {
                if (result.success) {
                    const eventName = result.result as string;
                    this._registerObserver(eventName);
                }
                electronResponse(event.sender, OkexMonitorChannel.monitSpotChannel, result);
            })
            .catch(error => {
                electronCatch(event.sender, OkexMonitorChannel.monitSpotChannel, error.toString());
            });
    }

    private readonly unmonitSpotChannel = (event: Event, args: MaybeUndefined<MarkedMap>): void => {
        apiOkexMonit.unmonitSpotChannel(args || {})
            .then(result => {
                if (result.success) {
                    const eventName = result.result as string;
                    this._unregisterObserver(eventName);
                }
                electronResponse(event.sender, OkexMonitorChannel.unmonitSpotChannel, result);
            })
            .catch(error => {
                electronCatch(event.sender, OkexMonitorChannel.unmonitSpotChannel, error.toString());
            });
    }

    private readonly onNotification = (notification: INotification): void => {
        // console.log("[BatchOrderAPI] onNotification:", notification.getName());
        EventBus.getInstance().emit(notification.getName(), notification.getBody());
    }
}

export default ElectronOkexMonitProxy;