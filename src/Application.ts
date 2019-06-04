import { WebContents } from "electron";
import { Platform, Facade } from "okrobot";
import { UserMediator } from "okrobot";
import {
    UserProxy,
    AutoMakerProxy,
    AutoMarketProxy,
    BatchOrderProxy,
    TakeOrderProxy
} from "okrobot";

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
        const autoMakerProxy = new AutoMakerProxy();
        facadeInst.registerProxy(autoMakerProxy);
        const autoMarketProxy = new AutoMarketProxy();
        facadeInst.registerProxy(autoMarketProxy);
        const batchOrderProxy = new BatchOrderProxy();
        facadeInst.registerProxy(batchOrderProxy);
        const takeOrderProxy = new TakeOrderProxy();
        facadeInst.registerProxy(takeOrderProxy);

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