import * as packjson from "../package.json";

export const DEFAULT = {
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
        USER_CONSTANT: {
            ["Viewer"]: 1,
            ["Inputer"]: 5,
            ["Admin"]: 10,
        },
    },
    MAIN_PKG: "Hounds.App",
    VERSION: packjson.version,
};
