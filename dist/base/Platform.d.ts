import { IPlatform } from "okrobot";
declare class ElectronPlatform implements IPlatform {
    getUserDataDir(): string;
}
export default ElectronPlatform;
