import IElectronProxy from "../../interfaces/electron-channel-proxy";
declare class ElectronOkexUtilsProxy implements IElectronProxy {
    onReigster(): void;
    onRemove(): void;
    private readonly getSpotTrade;
    private readonly getSpotCandles;
    private readonly getWallet;
    private readonly getWalletList;
}
export default ElectronOkexUtilsProxy;
