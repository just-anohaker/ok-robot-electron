import IElectronProxy from "../../interfaces/electron-channel-proxy";
declare class ElectronUserProxy implements IElectronProxy {
    onReigster(): void;
    onRemove(): void;
    private readonly getAllUser;
    private readonly getUser;
    private readonly addUser;
    private readonly removeUser;
    private readonly updateUser;
}
export default ElectronUserProxy;
