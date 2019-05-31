import { ipcMain, Event } from "electron";
import { apiUser, MaybeUndefined, MarkedMap } from "okrobot";

import IElectronProxy from "../../interfaces/electron-channel-proxy";
import { electronResponse, electronCatch } from "../../base/Common";
import EventBus from "../../base/EventBus";

enum UserChannel {
    getall = "user.getall",
    get = "user.get",
    add = "user.add",
    remove = "user.remove",
    update = "user.update"
}

class ElectronUserProxy implements IElectronProxy {
    onReigster(): void {
        ipcMain.on(UserChannel.getall, this.getAllUser);
        ipcMain.on(UserChannel.get, this.getUser);
        ipcMain.on(UserChannel.add, this.addUser);
        ipcMain.on(UserChannel.remove, this.removeUser);
        ipcMain.on(UserChannel.update, this.updateUser);
    }

    onRemove(): void {

    }

    private getAllUser = (event: Event, args: MaybeUndefined<MarkedMap>): void => {
        apiUser.getAll()
            .then(result => {
                electronResponse(event.sender, UserChannel.getall, result);
            })
            .catch(error => {
                electronCatch(event.sender, UserChannel.getall, error.toString());
            });
    }

    private getUser = (event: Event, args: MaybeUndefined<MarkedMap>): void => {
        apiUser.get(args || {})
            .then(result => {
                electronResponse(event.sender, UserChannel.get, result);
            })
            .catch(error => {
                electronCatch(event.sender, UserChannel.get, error.toString());
            });
    }

    private addUser = (event: Event, args: MaybeUndefined<MarkedMap>): void => {
        apiUser.add(args || {})
            .then(result => {
                electronResponse(event.sender, UserChannel.add, result);
            })
            .catch(error => {
                electronCatch(event.sender, UserChannel.add, error.toString());
            });
    }

    private removeUser = (event: Event, args: MaybeUndefined<MarkedMap>): void => {
        apiUser.remove(args || {})
            .then(result => {
                electronResponse(event.sender, UserChannel.remove, result);
            })
            .catch(error => {
                electronCatch(event.sender, UserChannel.remove, error.toString());
            });
    }

    private updateUser = (event: Event, args: MaybeUndefined<MarkedMap>): void => {
        apiUser.update(args || {})
            .then(result => {
                electronResponse(event.sender, UserChannel.update, result);
            })
            .catch(error => {
                electronCatch(event.sender, UserChannel.update, error.toString());
            });
    }
}

export default ElectronUserProxy;