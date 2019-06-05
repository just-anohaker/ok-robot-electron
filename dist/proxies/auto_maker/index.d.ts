import IElectronProxy from "../../interfaces/electron-channel-proxy";
declare class ElectronAutoMakerProxy implements IElectronProxy {
    onReigster(): void;
    onRemove(): void;
    private readonly init;
    private readonly start;
    private readonly stop;
    private readonly isRunning;
    private readonly getOptionsAndAccount;
}
export default ElectronAutoMakerProxy;
