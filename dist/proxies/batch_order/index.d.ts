import IElectronProxy from "../../interfaces/electron-channel-proxy";
declare class ElectronBatchOrderProxy implements IElectronProxy {
    onReigster(): void;
    onRemove(): void;
    private generate;
    private start;
}
export default ElectronBatchOrderProxy;
