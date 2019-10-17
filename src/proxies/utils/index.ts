import { ipcMain, Event, dialog } from "electron";

import Application from "../../Application";
import IElectronProxy from "../../interfaces/electron-channel-proxy";
import { electronResponse, electronCatch } from "../../base/Common";
import { MaybeUndefined, MarkedMap } from "okrobot";

import fs from "fs";

const enum Channels {
    openFileDialog = "utils.openFileDialog",
    retrieveFileData = "utils.retrieveFileData"
}

interface RetrieveFileDataParams {
    filepath: string;
}

export class ElectronUtils implements IElectronProxy {
    constructor() {
        this.openFileDialog = this.openFileDialog.bind(this);
        this.retrieveFileData = this.retrieveFileData.bind(this);
    }

    onReigster() {
        ipcMain.on(Channels.openFileDialog, this.openFileDialog);
        ipcMain.on(Channels.retrieveFileData, this.retrieveFileData);
    }

    onRemove() {
        ipcMain.removeListener(Channels.openFileDialog, this.openFileDialog);
        ipcMain.removeListener(Channels.retrieveFileData, this.retrieveFileData);
    }

    private openFileDialog(evt: Event, args: MaybeUndefined<MarkedMap>): void {
        const applicaton = Application.getInstance();
        const mainWindow = applicaton.mainWindow!;
        dialog.showOpenDialog(
            mainWindow,
            {
                title: "预警音乐文件选择",
                properties: ["openFile"],
                filters: [
                    { name: "预警音乐", extensions: ["mp3", "wav", "ogg", "flac"] }
                ]
            },
            (filePaths: string[] | undefined) => {
                if (filePaths === undefined || filePaths.length <= 0) {
                    // cancel
                    electronResponse(
                        evt.sender,
                        Channels.openFileDialog,
                        {
                            success: true,
                            result: {
                                canceled: true
                            }
                        }
                    );
                    return;
                }

                electronResponse(
                    evt.sender,
                    Channels.openFileDialog,
                    {
                        success: true,
                        result: {
                            canceled: false,
                            filepath: filePaths[0]
                        }
                    }
                );
            }
        );
    }

    private retrieveFileData(evt: Event, args: MaybeUndefined<MarkedMap>): void {
        const filepath = (args! as RetrieveFileDataParams).filepath;
        if (!fs.existsSync(filepath)) {
            return electronCatch(
                evt.sender,
                Channels.retrieveFileData,
                `file(${filepath}) not exists.`
            );
        }

        try {
            const fileData = fs.readFileSync(filepath);
            return electronResponse(
                evt.sender,
                Channels.retrieveFileData,
                {
                    success: true,
                    result: {
                        data: fileData
                    }
                }
            );
        } catch (error) {
            return electronCatch(
                evt.sender,
                Channels.retrieveFileData,
                `${error}`
            );
        }
    }
}

export default ElectronUtils;