import { WebContents, BrowserWindow } from "electron";
declare class Application {
    private static _instance?;
    static getInstance(): Application;
    private _electronProxies;
    private _browserWindow?;
    private constructor();
    changeWebContents(newWebContents: WebContents): void;
    mainWindow: BrowserWindow;
    cwd(): string;
    private initializeOkRobot;
    private initializeElectron;
}
export default Application;
