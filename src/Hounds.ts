import axios, { AxiosRequestConfig } from "axios";
import * as packjson from "../package.json";
import * as HHH from "./types/HHHTypes";
import * as API from "./types/HHHApiTypes";
import * as he from "./HoundsEvents";

export const axiosConfig: AxiosRequestConfig = {
    baseURL: "http://localhost:8080",
    headers: {
        Version: packjson.version,
    },
};

function getRequestConfig(auth: HHH.IHoundAuth, requestConfig?: AxiosRequestConfig) {
    if (requestConfig) {
        return {
            ...axiosConfig,
            data: {
                ...auth,
                ...requestConfig.data,
            },
            ...requestConfig,
        };
    } else {
        return {
            ...axiosConfig,
            data: {
                ...auth,
            },
        };
    }
}

export async function login(username: string, password: string) {
    const user = {
        password,
        username,
    };

    const response = await axios.post("/login", user, axiosConfig);

    return response.data;
}

export async function checkAuthentication(auth: HHH.IHoundAuth): Promise<boolean> {
    return new Promise((resolve, reject) => {
        axios.post("/login", auth, getRequestConfig(auth))
            .then(() => resolve(true) )
            .catch(() => resolve(false) );
    });
}

export async function getWeek(weekStart: Date, auth: HHH.IHoundAuth) {
    const requestConfig = {
        params: {
            date: weekStart,
        },
    };
    const response = await axios.get("/api/week", getRequestConfig(auth, requestConfig));
    return he.formatEventData(weekStart, response.data as API.IHoundAPIBooking[]);
}

export async function addDog(dog: API.IHoundAPIDog, auth: HHH.IHoundAuth) {
    return axios.post("/api/dogs", dog, getRequestConfig(auth));
}

export async function addEvent(event: HHH.IHoundEvent, auth: HHH.IHoundAuth) {
    const newEvent = he.toApiEvent(event);
    return axios.post("/api/events", newEvent, getRequestConfig(auth));
}

export async function findEvents(eventText: string, auth: HHH.IHoundAuth) {
    const requestConfig = {
        params: {
            searchText: eventText,
        },
    };

    return axios.get("/api/find", getRequestConfig(auth, requestConfig));
}

export async function removeEvent(eventId: string, auth: HHH.IHoundAuth) {
    return axios.delete("/api/events/" + eventId, getRequestConfig(auth));
}

export async function removeDog(dogId: string, auth: HHH.IHoundAuth) {
    return axios.delete("/api/dogs/" + dogId, getRequestConfig(auth));
}

export async function editDog(dogProfile: API.IHoundAPIDog, auth: HHH.IHoundAuth) {
    return axios.put("/api/dogs", dogProfile, getRequestConfig(auth));
}

export async function retrieveDog(dogId: string, auth: HHH.IHoundAuth) {
    const response = await axios.get("/api/dogs/" + dogId, getRequestConfig(auth));
    const dog = response.data as HHH.IHoundDog;
    for (const booking of dog.bookings) {
        booking.startDate = new Date(booking.startDate.valueOf());
        booking.endDate = new Date(booking.endDate.valueOf());
    }
    dog.id = dogId;

    return dog;
}

export async function addUser(username: string, password: string, permissionLevel: string, auth: HHH.IHoundAuth) {
    const user = {
        password,
        permissions: permissionLevel,
        username,
    };

    return axios.post("/api/users", user, getRequestConfig(auth));
}

export async function deleteUser(username: string, auth: HHH.IHoundAuth) {
    return axios.delete("/api/users/" + username, getRequestConfig(auth));
}

export async function changePassword(username: string, oldPassword: string, newPassword: string, auth: HHH.IHoundAuth) {
    const user = {
        newPassword,
        oldPassword,
        username,
    };

    return axios.put("/api/user/password", user, getRequestConfig(auth));
}
