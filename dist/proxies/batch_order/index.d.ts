import IElectronProxy from "../../interfaces/electron-channel-proxy";
declare class ElectronBatchOrderProxy implements IElectronProxy {
    private _observer?;
    constructor();
    onReigster(): void;
    onRemove(): void;
    private readonly generate;
    private readonly cancel;
    private readonly limitOrder;
    private readonly marketOrder;
    private readonly startDepthInfo;
    private readonly stopDepthInfo;
    private readonly getOrderData;
    private readonly onNotification;
}
export default ElectronBatchOrderProxy;
