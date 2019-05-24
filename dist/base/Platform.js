"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const electron_1 = require("electron");
class ElectronPlatform {
    getUserDataDir() {
        const ownDirName = "OKExPreference";
        const destDir = path.resolve(path.join(electron_1.app.getPath("documents"), ownDirName));
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir);
        }
        return destDir;
    }
}
exports.default = ElectronPlatform;
