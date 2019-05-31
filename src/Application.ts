import { WebContents } from "electron";
import { Facade, UserProxy, UserMediator, Platform } from "okrobot";
import ElectronPlatform from "./base/Platform";
import IElectronProxy from "./interfaces/electron-channel-proxy"
import ElectronUserProxy from "./proxies/user";
import EventBus from "./base/EventBus";

class Application {
    private static _instance?: Application;

    static getInstance(): Application {
        if (Application._instance === undefined) {
            Application._instance = new Application();
        }

        return Application._instance!;
    }


    private _electronProxies: IElectronProxy[];
    private constructor() {
        this._electronProxies = [];

        this.initializeOkRobot();
        this.initializeElectron();
    }

    changeWebContents(newWebContents: WebContents): void {
        EventBus.getInstance().eventEmitter = newWebContents;
    }

    private initializeOkRobot(): void {
        Platform.getInstance().setPlatform(new ElectronPlatform());

        const facadeInst = Facade.getInstance();

        const userProxy = new UserProxy();
        facadeInst.registerProxy(userProxy);

        const userMediator = new UserMediator();
        facadeInst.registerMediator(userMediator);
    }

    private initializeElectron(): void {
        const electronUserProxy = new ElectronUserProxy();
        electronUserProxy.onReigster();
        this._electronProxies.push(electronUserProxy);
    }

}

export default Application;