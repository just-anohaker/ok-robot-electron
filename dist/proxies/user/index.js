"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const okrobot_1 = require("okrobot");
const Common_1 = require("../../base/Common");
var UserChannel;
(function (UserChannel) {
    UserChannel["getall"] = "user.getall";
    UserChannel["get"] = "user.get";
    UserChannel["add"] = "user.add";
    UserChannel["remove"] = "user.remove";
    UserChannel["update"] = "user.update";
})(UserChannel || (UserChannel = {}));
class ElectronUserProxy {
    constructor() {
        this.getAllUser = (event, args) => {
            okrobot_1.apiUser.getAll()
                .then(result => {
                Common_1.electronResponse(event.sender, UserChannel.getall, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, UserChannel.getall, error.toString());
            });
        };
        this.getUser = (event, args) => {
            okrobot_1.apiUser.get(args || {})
                .then(result => {
                Common_1.electronResponse(event.sender, UserChannel.get, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, UserChannel.get, error.toString());
            });
        };
        this.addUser = (event, args) => {
            okrobot_1.apiUser.add(args || {})
                .then(result => {
                Common_1.electronResponse(event.sender, UserChannel.add, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, UserChannel.add, error.toString());
            });
        };
        this.removeUser = (event, args) => {
            okrobot_1.apiUser.remove(args || {})
                .then(result => {
                Common_1.electronResponse(event.sender, UserChannel.remove, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, UserChannel.remove, error.toString());
            });
        };
        this.updateUser = (event, args) => {
            okrobot_1.apiUser.update(args || {})
                .then(result => {
                Common_1.electronResponse(event.sender, UserChannel.update, result);
            })
                .catch(error => {
                Common_1.electronCatch(event.sender, UserChannel.update, error.toString());
            });
        };
    }
    onReigster() {
        electron_1.ipcMain.on(UserChannel.getall, this.getAllUser);
        electron_1.ipcMain.on(UserChannel.get, this.getUser);
        electron_1.ipcMain.on(UserChannel.add, this.addUser);
        electron_1.ipcMain.on(UserChannel.remove, this.removeUser);
        electron_1.ipcMain.on(UserChannel.update, this.updateUser);
    }
    onRemove() {
    }
}
exports.default = ElectronUserProxy;
