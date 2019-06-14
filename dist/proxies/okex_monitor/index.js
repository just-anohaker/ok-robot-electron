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
class ElectronOkexMonitProxy {
    constructor() {
        this.monitSpotTrade = (event, args) => {
            okrobot_1.apiOkexMonit.monitSpotTrade(args || {})
                .then(result => {
                if (result.success) {
                    const eventName = result.result;
                    this._registerObserver(eventName);
                }
                Common_1.electronResponse(event.sender, "okex_monitor.spotTrade" /* monitSpotTrade */, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, "okex_monitor.spotTrade" /* monitSpotTrade */, error.toString());
            });
        };
        this.unmonitSpotTrade = (event, args) => {
            okrobot_1.apiOkexMonit.unmonitSpotTrade(args || {})
                .then(result => {
                if (result.success) {
                    const eventName = result.result;
                    this._unregisterObserver(eventName);
                }
                Common_1.electronResponse(event.sender, "okex_monitor.spotTrade.unmonit" /* unmonitSpotTrade */, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, "okex_monitor.spotTrade.unmonit" /* unmonitSpotTrade */, error.toString());
            });
        };
        this.monitSpotTicker = (event, args) => {
            okrobot_1.apiOkexMonit.monitSpotTicker(args || {})
                .then(result => {
                if (result.success) {
                    const eventName = result.result;
                    this._registerObserver(eventName);
                }
                Common_1.electronResponse(event.sender, "okex_monitor.spotTicker" /* monitSpotTicker */, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, "okex_monitor.spotTicker" /* monitSpotTicker */, error.toString());
            });
        };
        this.unmonitSpotTicker = (event, args) => {
            okrobot_1.apiOkexMonit.unmonitSpotTicker(args || {})
                .then(result => {
                if (result.success) {
                    const eventName = result.result;
                    this._unregisterObserver(eventName);
                }
                Common_1.electronResponse(event.sender, "okex_monitor.spotTicker.unmonit" /* unmonitSpotTicker */, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, "okex_monitor.spotTicker.unmonit" /* unmonitSpotTicker */, error.toString());
            });
        };
        this.monitSpotChannel = (event, args) => {
            okrobot_1.apiOkexMonit.monitSpotChannel(args || {})
                .then(result => {
                if (result.success) {
                    const eventName = result.result;
                    this._registerObserver(eventName);
                }
                Common_1.electronResponse(event.sender, "okex_monitor.spotChannel" /* monitSpotChannel */, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, "okex_monitor.spotChannel" /* monitSpotChannel */, error.toString());
            });
        };
        this.unmonitSpotChannel = (event, args) => {
            okrobot_1.apiOkexMonit.unmonitSpotChannel(args || {})
                .then(result => {
                if (result.success) {
                    const eventName = result.result;
                    this._unregisterObserver(eventName);
                }
                Common_1.electronResponse(event.sender, "okex_monitor.spotChannel.unmonit" /* unmonitSpotChannel */, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, "okex_monitor.spotChannel.unmonit" /* unmonitSpotChannel */, error.toString());
            });
        };
        this.onNotification = (notification) => {
            // console.log("[BatchOrderAPI] onNotification:", notification.getName());
            EventBus_1.default.getInstance().emit(notification.getName(), notification.getBody());
        };
        this._observer = new okrobot_2.Observer(this.onNotification, this);
        this._channelNames = new Map();
    }
    onReigster() {
        electron_1.ipcMain.on("okex_monitor.spotTrade" /* monitSpotTrade */, this.monitSpotTrade);
        electron_1.ipcMain.on("okex_monitor.spotTrade.unmonit" /* unmonitSpotTrade */, this.unmonitSpotTrade);
        electron_1.ipcMain.on("okex_monitor.spotTicker" /* monitSpotTicker */, this.monitSpotTicker);
        electron_1.ipcMain.on("okex_monitor.spotTicker.unmonit" /* unmonitSpotTicker */, this.unmonitSpotTicker);
        electron_1.ipcMain.on("okex_monitor.spotChannel" /* monitSpotChannel */, this.monitSpotChannel);
        electron_1.ipcMain.on("okex_monitor.spotChannel.unmonit" /* unmonitSpotChannel */, this.unmonitSpotChannel);
    }
    onRemove() {
    }
    _registerObserver(eventName) {
        if (!this._channelNames.has(eventName)) {
            console.log("registerObserver:", eventName);
            okrobot_3.Facade.getInstance().registerObserver(eventName, this._observer);
            this._channelNames.set(eventName, 1);
        }
        else {
            this._channelNames.set(eventName, this._channelNames.get(eventName) + 1);
        }
    }
    _unregisterObserver(eventName) {
        if (!this._channelNames.has(eventName)) {
            return;
        }
        const count = this._channelNames.get(eventName);
        if (count > 1) {
            this._channelNames.set(eventName, count - 1);
            return;
        }
        console.log("unregisterObserver:", eventName);
        okrobot_3.Facade.getInstance().removeObserver(eventName, this);
        this._channelNames.delete(eventName);
    }
}
exports.default = ElectronOkexMonitProxy;
