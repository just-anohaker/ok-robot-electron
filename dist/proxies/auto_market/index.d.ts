import IElectronProxy from "../../interfaces/electron-channel-proxy";
declare class ElectronAutoMarketProxy implements IElectronProxy {
    onReigster(): void;
    onRemove(): void;
    private init;
    private start;
    private stop;
    private isRunning;
    private getOptionsAndAccount;
}
export default ElectronAutoMarketProxy;
