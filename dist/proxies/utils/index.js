"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const Application_1 = __importDefault(require("../../Application"));
const Common_1 = require("../../base/Common");
const fs_1 = __importDefault(require("fs"));
class ElectronUtils {
    constructor() {
        this.openFileDialog = this.openFileDialog.bind(this);
        this.retrieveFileData = this.retrieveFileData.bind(this);
    }
    onReigster() {
        electron_1.ipcMain.on("utils.openFileDialog" /* openFileDialog */, this.openFileDialog);
        electron_1.ipcMain.on("utils.retrieveFileData" /* retrieveFileData */, this.retrieveFileData);
    }
    onRemove() {
        electron_1.ipcMain.removeListener("utils.openFileDialog" /* openFileDialog */, this.openFileDialog);
        electron_1.ipcMain.removeListener("utils.retrieveFileData" /* retrieveFileData */, this.retrieveFileData);
    }
    openFileDialog(evt, args) {
        const applicaton = Application_1.default.getInstance();
        const mainWindow = applicaton.mainWindow;
        electron_1.dialog.showOpenDialog(mainWindow, {
            title: "预警音乐文件选择",
            properties: ["openFile"],
            filters: [
                { name: "Mp3音乐", extensions: ["mp3"] },
                { name: "Ogg音乐", extensions: ["ogg"] }
            ]
        }, (filePaths) => {
            if (filePaths === undefined || filePaths.length <= 0) {
                // cancel
                Common_1.electronResponse(evt.sender, "utils.openFileDialog" /* openFileDialog */, {
                    success: true,
                    result: {
                        canceled: true
                    }
                });
                return;
            }
            Common_1.electronResponse(evt.sender, "utils.openFileDialog" /* openFileDialog */, {
                success: true,
                result: {
                    canceled: false,
                    filepath: filePaths[0]
                }
            });
        });
    }
    retrieveFileData(evt, args) {
        const filepath = args.filepath;
        if (!fs_1.default.existsSync(filepath)) {
            return Common_1.electronCatch(evt.sender, "utils.retrieveFileData" /* retrieveFileData */, `file(${filepath}) not exists.`);
        }
        try {
            const fileData = fs_1.default.readFileSync(filepath);
            return Common_1.electronResponse(evt.sender, "utils.retrieveFileData" /* retrieveFileData */, {
                success: true,
                result: {
                    data: fileData
                }
            });
        }
        catch (error) {
            return Common_1.electronCatch(evt.sender, "utils.retrieveFileData" /* retrieveFileData */, `${error}`);
        }
    }
}
exports.ElectronUtils = ElectronUtils;
exports.default = ElectronUtils;
