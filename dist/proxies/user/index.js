"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const okrobot_1 = require("okrobot");
const Common_1 = require("../../base/Common");
class ElectronUserProxy {
    constructor() {
        this.getAllUser = (event, args) => {
            okrobot_1.apiUser.getAll()
                .then(result => {
                Common_1.electronResponse(event.sender, "user.getall" /* getall */, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, "user.getall" /* getall */, error.toString());
            });
        };
        this.getUser = (event, args) => {
            okrobot_1.apiUser.get(args || {})
                .then(result => {
                Common_1.electronResponse(event.sender, "user.get" /* get */, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, "user.get" /* get */, error.toString());
            });
        };
        this.addUser = (event, args) => {
            okrobot_1.apiUser.add(args || {})
                .then(result => {
                Common_1.electronResponse(event.sender, "user.add" /* add */, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, "user.add" /* add */, error.toString());
            });
        };
        this.removeUser = (event, args) => {
            okrobot_1.apiUser.remove(args || {})
                .then(result => {
                Common_1.electronResponse(event.sender, "user.remove" /* remove */, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, "user.remove" /* remove */, error.toString());
            });
        };
        this.updateUser = (event, args) => {
            okrobot_1.apiUser.update(args || {})
                .then(result => {
                Common_1.electronResponse(event.sender, "user.update" /* update */, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, "user.update" /* update */, error.toString());
            });
        };
    }
    onReigster() {
        electron_1.ipcMain.on("user.getall" /* getall */, this.getAllUser);
        electron_1.ipcMain.on("user.get" /* get */, this.getUser);
        electron_1.ipcMain.on("user.add" /* add */, this.addUser);
        electron_1.ipcMain.on("user.remove" /* remove */, this.removeUser);
        electron_1.ipcMain.on("user.update" /* update */, this.updateUser);
    }
    onRemove() {
    }
}
exports.default = ElectronUserProxy;
