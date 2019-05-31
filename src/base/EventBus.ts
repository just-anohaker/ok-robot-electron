import { WebContents, webContents } from "electron";

class EventBus {
    private static _instance?: EventBus;
    static getInstance(): EventBus {
        if (EventBus._instance === undefined) {
            EventBus._instance = new EventBus();
        }

        return EventBus._instance!;
    }

    private _eventEmitter?: WebContents;
    private constructor() {

    }

    get eventEmitter(): WebContents {
        return this._eventEmitter!;
    }

    set eventEmitter(val: WebContents) {
        console.log("hello world");
        this._eventEmitter = val;
    }

    emit(eventName: string, body?: any) {
        if (this._eventEmitter) {
            this._eventEmitter.send(eventName, body);
        }
    }
}

export default EventBus;