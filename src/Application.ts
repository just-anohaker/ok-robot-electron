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
import ElectronAutoMakerProxy from "./proxies/auto_maker";
import ElectronAutoMarketProxy from "./proxies/auto_market";
import ElectronBatchOrderProxy from "./proxies/batch_order";
import ElectronTakeOrderProxy from "./proxies/take_order";
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
        this._electronProxies.push(new ElectronUserProxy());
        this._electronProxies.push(new ElectronAutoMakerProxy());
        this._electronProxies.push(new ElectronAutoMarketProxy());
        this._electronProxies.push(new ElectronBatchOrderProxy());
        this._electronProxies.push(new ElectronTakeOrderProxy());

        for (const electronProxy of this._electronProxies) {
            electronProxy.onReigster();
        }
    }

}

export default Application;