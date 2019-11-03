import axios, { AxiosRequestConfig } from "axios";
import * as HHH from "./types/HHHTypes";
import * as API from "./types/HHHApiTypes";
import * as he from "./HoundsEvents";

export interface IHoundsConfig {
    apiURL: string;
    apiVersion: string;
    apiAuth: HHH.IHoundAuth;
}

export class HoundsConfig {

    apiURL: string;
    apiVersion: string;
    apiAuth: HHH.IHoundAuth;

    constructor(opts: IHoundsConfig) {
        this.apiAuth = opts.apiAuth;
        this.apiURL = opts.apiURL;
        this.apiVersion = opts.apiVersion;
    }

    // tslint:disable-next-line: no-any
    newRequest(params?: any, data?: any): AxiosRequestConfig {
        return {
            baseURL: this.apiURL,
            headers: {
                version: this.apiVersion,
            },
            params: {
                ...this.apiAuth,
                ...params,
            },
            data: {
                ...data,
            },
        };
    }

}

export async function login(username: string, password: string, url: string) {
    const user = {
        password,
        username,
    };

    const requestConfig = {
        baseURL: url,
    };

    const response = await axios.post("/login", user, requestConfig);

    return response.data;
}

export async function checkAuthentication(config: HoundsConfig): Promise<boolean> {
    return new Promise((resolve, reject) => {
        axios.post("/login", {}, config.newRequest())
            .then(() => resolve(true))
            .catch(() => resolve(false));
    });
}

export async function getWeek(weekStart: Date, config: HoundsConfig) {
    const response = await axios.get("/api/week", config.newRequest({date: weekStart}));
    return he.formatEventData(weekStart, response.data as API.IHoundAPIBooking[]);
}

export async function addDog(dog: HHH.IHoundDog, config: HoundsConfig) {
    const apiDog = he.toApiDog(dog);
    return axios.post("/api/dogs", apiDog, config.newRequest());
}

export async function addEvent(event: HHH.IHoundEvent, config: HoundsConfig) {
    const newEvent = he.toApiEvent(event);
    return axios.post("/api/events", newEvent, config.newRequest());
}

export async function findEvents(eventText: string, config: HoundsConfig) {
    return axios.get("/api/find", config.newRequest({searchText: eventText}));
}

export async function removeEvent(eventId: string, config: HoundsConfig) {
    return axios.delete("/api/events/" + eventId, config.newRequest());
}

export async function removeDog(dogId: string, config: HoundsConfig) {
    return axios.delete("/api/dogs/" + dogId, config.newRequest());
}

export async function editDog(dogProfile: HHH.IHoundDog, config: HoundsConfig) {
    const apiDog = he.toApiDog(dogProfile);
    return axios.put("/api/dogs", apiDog, config.newRequest());
}

export async function retrieveDog(dogId: string, config: HoundsConfig) {
    const response = await axios.get("/api/dogs/" + dogId, config.newRequest());
    const dog = response.data as HHH.IHoundDog;
    for (const booking of dog.bookings) {
        booking.startDate = new Date(booking.startDate.valueOf());
        booking.endDate = new Date(booking.endDate.valueOf());
    }
    dog.id = dogId;

    return dog;
}

export async function addUser(username: string, password: string, permissions: number, config: HoundsConfig) {
    const user = {
        password,
        permissions,
        username,
    };

    return axios.post("/api/users", user, config.newRequest());
}

export async function deleteUser(username: string, config: HoundsConfig) {
    return axios.delete("/api/users/" + username, config.newRequest());
}

export async function changePassword(username: string, oldPassword: string, newPassword: string, config: HoundsConfig) {
    const user = {
        newPassword,
        oldPassword,
        username,
    };

    return axios.put("/api/user/password", user, config.newRequest());
}
