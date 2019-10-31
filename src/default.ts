interface IDefaults {
    CONSTANTS: {
        ARRIVING: string;
        BOARDING: string,
        DEPARTING: string,
        DAYCARE: string,
        DOG: string,
        EVENT_TYPES: string[],
        USER_CONSTANT: {
            [key: string]: number,
        },
    };
}

export const DEFAULT: IDefaults = {
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
};
