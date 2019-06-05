import IElectronProxy from "../../interfaces/electron-channel-proxy";
declare class ElectronBatchOrderProxy implements IElectronProxy {
    onReigster(): void;
    onRemove(): void;
    private readonly generate;
    private readonly cancel;
    private readonly limitOrder;
    private readonly marketOrder;
}
export default ElectronBatchOrderProxy;
