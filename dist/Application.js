"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const okrobot_1 = require("okrobot");
const Platform_1 = __importDefault(require("./base/Platform"));
const user_1 = __importDefault(require("./proxies/user"));
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
    initializeOkRobot() {
        okrobot_1.Platform.getInstance().setPlatform(new Platform_1.default());
        const facadeInst = okrobot_1.Facade.getInstance();
        const userProxy = new okrobot_1.UserProxy();
        facadeInst.registerProxy(userProxy);
        const userMediator = new okrobot_1.UserMediator();
        facadeInst.registerMediator(userMediator);
    }
    initializeElectron() {
        const electronUserProxy = new user_1.default();
        electronUserProxy.onReigster();
        this._electronProxies.push(electronUserProxy);
    }
}
exports.default = Application;
