import * as path from "path";
import * as fs from "fs";
import { app } from "electron";
import { IPlatform } from "okrobot";

class ElectronPlatform implements IPlatform {
    getUserDataDir(): string {
        const ownDirName = "okex_userdatas";
        const destDir = path.resolve(path.join(app.getPath("documents"), ownDirName));

        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir);
        }

        return destDir;
    }
}

export default ElectronPlatform;