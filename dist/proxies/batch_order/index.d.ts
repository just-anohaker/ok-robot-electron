import IElectronProxy from "../../interfaces/electron-channel-proxy";
declare class ElectronBatchOrderProxy implements IElectronProxy {
    onReigster(): void;
    onRemove(): void;
    private readonly generate;
    private readonly start;
    private readonly cancel;
}
export default ElectronBatchOrderProxy;
