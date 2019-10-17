import IElectronProxy from "../../interfaces/electron-channel-proxy";
export declare class ElectronUtils implements IElectronProxy {
    constructor();
    onReigster(): void;
    onRemove(): void;
    private openFileDialog;
    private retrieveFileData;
}
export default ElectronUtils;
