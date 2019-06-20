import { ipcMain, Event } from "electron";
import { apiOkexUtils, MaybeUndefined, MarkedMap } from "okrobot";

import IElectronProxy from "../../interfaces/electron-channel-proxy";
import { electronResponse, electronCatch } from "../../base/Common";
import EventBus from "../../base/EventBus";

const enum OkexUtilsChannel {
    getSpotTrade = "okex_utils.getSpotTrade",
    getSpotCandles = "okex_utils.getSpotCandles",
    getWallet = "okex_utils.getWallet",
    getWalletList = "okex_utils.getWalletList"
}

class ElectronOkexUtilsProxy implements IElectronProxy {
    onReigster() {
        ipcMain.on(OkexUtilsChannel.getSpotTrade, this.getSpotTrade);
        ipcMain.on(OkexUtilsChannel.getSpotCandles, this.getSpotCandles);
        ipcMain.on(OkexUtilsChannel.getWallet, this.getWallet);
        ipcMain.on(OkexUtilsChannel.getWalletList, this.getWalletList);
    }

    onRemove() {

    }

    private readonly getSpotTrade = (event: Event, args: MaybeUndefined<MarkedMap>): void => {
        apiOkexUtils.getSpotTrade(args || {})
            .then(result => {
                electronResponse(event.sender, OkexUtilsChannel.getSpotTrade, result);
            })
            .catch(error => {
                electronCatch(event.sender, OkexUtilsChannel.getSpotTrade, error.toString());
            });
    }

    private readonly getSpotCandles = (event: Event, args: MaybeUndefined<MarkedMap>): void => {
        apiOkexUtils.getSpotCandles(args || {})
            .then(result => {
                electronResponse(event.sender, OkexUtilsChannel.getSpotCandles, result);
            })
            .catch(error => {
                electronCatch(event.sender, OkexUtilsChannel.getSpotCandles, error.toString());
            });
    }

    private readonly getWallet = (event: Event, args: MaybeUndefined<MarkedMap>): void => {
        apiOkexUtils.getWallet(args || {})
            .then(result => {
                electronResponse(event.sender, OkexUtilsChannel.getWallet, result);
            })
            .catch(error => {
                electronCatch(event.sender, OkexUtilsChannel.getWallet, error.toString());
            });
    }

    private readonly getWalletList = (event: Event, args: MaybeUndefined<MarkedMap>): void => {
        apiOkexUtils.getWalletList(args || {})
            .then(result => {
                electronResponse(event.sender, OkexUtilsChannel.getWalletList, result);
            })
            .catch(error => {
                electronCatch(event.sender, OkexUtilsChannel.getWalletList, error.toString());
            });
    }
}

export default ElectronOkexUtilsProxy;