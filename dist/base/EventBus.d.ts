import { WebContents } from "electron";
declare class EventBus {
    private static _instance?;
    static getInstance(): EventBus;
    private _eventEmitter?;
    private constructor();
    eventEmitter: WebContents;
    emit(eventName: string, body?: any): void;
}
export default EventBus;
