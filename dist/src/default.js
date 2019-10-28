"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var packjson = __importStar(require("../package.json"));
exports.DEFAULT = {
    CONSTANTS: {
        ARRIVING: "arriving",
        DEPARTING: "departing",
        BOARDING: "boarding",
        DAYCARE: "daycare",
        DOG: "dog",
        EVENT_TYPES: [
            "arriving",
            "departing",
            "daycare",
            "grooming",
            "visit",
            "foster",
            "eval",
            "general",
        ],
        USER_CONSTANT: (_a = {},
            _a["Viewer"] = 1,
            _a["Inputer"] = 5,
            _a["Admin"] = 10,
            _a),
    },
    MAIN_PKG: "Hounds.App",
    VERSION: packjson.version,
};
//# sourceMappingURL=default.js.map