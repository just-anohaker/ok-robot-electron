"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const okrobot_1 = require("okrobot");
const okrobot_2 = require("okrobot");
const okrobot_3 = require("okrobot");
const Platform_1 = __importDefault(require("./base/Platform"));
const user_1 = __importDefault(require("./proxies/user"));
const EventBus_1 = __importDefault(require("./base/EventBus"));
class Application {
    static getInstance() {
        if (Application._instance === undefined) {
            Application._instance = new Application();
        }
        return Application._instance;
    }
    constructor() {
        this._electronProxies = [];
        this.initializeOkRobot();
        this.initializeElectron();
    }
    changeWebContents(newWebContents) {
        EventBus_1.default.getInstance().eventEmitter = newWebContents;
    }
    initializeOkRobot() {
        okrobot_1.Platform.getInstance().setPlatform(new Platform_1.default());
        const facadeInst = okrobot_1.Facade.getInstance();
        const userProxy = new okrobot_3.UserProxy();
        facadeInst.registerProxy(userProxy);
        const autoMakerProxy = new okrobot_3.AutoMakerProxy();
        facadeInst.registerProxy(autoMakerProxy);
        const autoMarketProxy = new okrobot_3.AutoMarketProxy();
        facadeInst.registerProxy(autoMarketProxy);
        const batchOrderProxy = new okrobot_3.BatchOrderProxy();
        facadeInst.registerProxy(batchOrderProxy);
        const takeOrderProxy = new okrobot_3.TakeOrderProxy();
        facadeInst.registerProxy(takeOrderProxy);
        const userMediator = new okrobot_2.UserMediator();
        facadeInst.registerMediator(userMediator);
    }
    initializeElectron() {
        const electronUserProxy = new user_1.default();
        electronUserProxy.onReigster();
        this._electronProxies.push(electronUserProxy);
    }
}
exports.default = Application;
