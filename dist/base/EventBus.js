"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventBus {
    static getInstance() {
        if (EventBus._instance === undefined) {
            EventBus._instance = new EventBus();
        }
        return EventBus._instance;
    }
    constructor() {
    }
    get eventEmitter() {
        return this._eventEmitter;
    }
    set eventEmitter(val) {
        this._eventEmitter = val;
    }
    emit(eventName, body) {
        if (this._eventEmitter) {
            this._eventEmitter.send(eventName, body);
        }
    }
}
exports.default = EventBus;
