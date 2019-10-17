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
const auto_maker_1 = __importDefault(require("./proxies/auto_maker"));
const auto_market_1 = __importDefault(require("./proxies/auto_market"));
const batch_order_1 = __importDefault(require("./proxies/batch_order"));
const take_order_1 = __importDefault(require("./proxies/take_order"));
const okex_utils_1 = __importDefault(require("./proxies/okex_utils"));
const okex_monitor_1 = __importDefault(require("./proxies/okex_monitor"));
const utils_1 = __importDefault(require("./proxies/utils"));
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
    set mainWindow(arg) {
        this._browserWindow = arg;
    }
    get mainWindow() {
        return this._browserWindow;
    }
    cwd() {
        return okrobot_1.Platform.getInstance().getUserDataDir();
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
        const okexUtilsProxy = new okrobot_3.OkexUtilsProxy();
        facadeInst.registerProxy(okexUtilsProxy);
        const okexMonitorProxy = new okrobot_3.OkexMonitProxy();
        facadeInst.registerProxy(okexMonitorProxy);
        const userMediator = new okrobot_2.UserMediator();
        facadeInst.registerMediator(userMediator);
    }
    initializeElectron() {
        this._electronProxies.push(new user_1.default());
        this._electronProxies.push(new auto_maker_1.default());
        this._electronProxies.push(new auto_market_1.default());
        this._electronProxies.push(new batch_order_1.default());
        this._electronProxies.push(new take_order_1.default());
        this._electronProxies.push(new okex_utils_1.default());
        this._electronProxies.push(new okex_monitor_1.default());
        this._electronProxies.push(new utils_1.default());
        for (const electronProxy of this._electronProxies) {
            electronProxy.onReigster();
        }
    }
}
exports.default = Application;
