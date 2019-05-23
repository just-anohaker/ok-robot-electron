declare class Application {
    private static _instance?;
    getInstance(): Application;
    private _electronProxies;
    private constructor();
    private initializeOkRobot;
    private initializeElectron;
}
export default Application;
