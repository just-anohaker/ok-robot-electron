import IElectronProxy from "../../interfaces/electron-channel-proxy";
declare class ElectronTakeOrderProxy implements IElectronProxy {
    onReigster(): void;
    onRemove(): void;
    private generate;
    private start;
}
export default ElectronTakeOrderProxy;
