import IElectronProxy from "../../interfaces/electron-channel-proxy";
declare class ElectronTakeOrderProxy implements IElectronProxy {
    onReigster(): void;
    onRemove(): void;
    private readonly generate;
    private readonly start;
}
export default ElectronTakeOrderProxy;
