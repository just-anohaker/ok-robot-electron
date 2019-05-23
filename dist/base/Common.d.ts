import { WebContents } from "electron";
import { MarkedMap } from "okrobot";
export { MarkedMap } from "okrobot";
export declare function electronResponse(sender: WebContents, channel: string, data: MarkedMap): void;
export declare function electronCatch(sender: WebContents, channel: string, error: string): void;
