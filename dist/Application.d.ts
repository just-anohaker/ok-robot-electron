import { WebContents } from "electron";
declare class Application {
    private static _instance?;
    static getInstance(): Application;
    private _electronProxies;
    private constructor();
    changeWebContents(newWebContents: WebContents): void;
    private initializeOkRobot;
    private initializeElectron;
}
export default Application;
