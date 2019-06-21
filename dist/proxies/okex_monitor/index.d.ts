import IElectronProxy from "../../interfaces/electron-channel-proxy";
declare class ElectronOkexMonitProxy implements IElectronProxy {
    private _observer?;
    private _channelNames;
    constructor();
    onReigster(): void;
    onRemove(): void;
    private _registerObserver;
    private _unregisterObserver;
    private readonly monitSpotTrade;
    private readonly unmonitSpotTrade;
    private readonly monitSpotTicker;
    private readonly unmonitSpotTicker;
    private readonly monitSpotChannel;
    private readonly unmonitSpotChannel;
    private readonly monitSpotDepth;
    private readonly unmonitSpotDepth;
    private readonly monitSpotWallet;
    private readonly unmonitSpotWallet;
    private readonly onNotification;
}
export default ElectronOkexMonitProxy;
