"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function electronResponse(sender, channel, data) {
    sender.send(channel, data);
}
exports.electronResponse = electronResponse;
function electronCatch(sender, channel, error) {
    sender.send(channel, {
        success: false,
        error
    });
}
exports.electronCatch = electronCatch;
