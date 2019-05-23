import { WebContents } from "electron";
import { MarkedMap } from "okrobot";

export { MarkedMap } from "okrobot"

export function electronResponse(sender: WebContents, channel: string, data: MarkedMap): void {
    sender.send(channel, data);
}

export function electronCatch(sender: WebContents, channel: string, error: string): void {
    sender.send(channel, {
        success: false,
        error
    });
}