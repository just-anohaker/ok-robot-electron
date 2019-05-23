import IElectronProxy from "../../interfaces/electron-channel-proxy";
declare class ElectronUserProxy implements IElectronProxy {
    onReigster(): void;
    onRemove(): void;
    private getAllUser;
    private getUser;
    private addUser;
    private removeUser;
    private updateUser;
}
export default ElectronUserProxy;
