import { Facade, UserProxy, UserMediator } from "okrobot";

import IElectronProxy from "./interfaces/electron-channel-proxy"

import ElectronUserProxy from "./proxies/user";

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

    private initializeOkRobot(): void {
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