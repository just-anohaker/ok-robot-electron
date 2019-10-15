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
    private readonly icebergOrder;
    private readonly startDepthInfo;
    private readonly stopDepthInfo;
    private readonly getOrderData;
    private readonly toBatchOrder;
    private readonly addWarnings;
    private readonly removeWarnings;
    private readonly isWarnings;
    private readonly startWarnings;
    private readonly stopWarnings;
    private readonly listWarnings;
    private readonly onNotification;
}
export default ElectronBatchOrderProxy;
