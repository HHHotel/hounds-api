import axios, { AxiosRequestConfig } from "axios";
import * as HHH from "./types/HHHTypes";
import * as API from "./types/HHHApiTypes";
import * as he from "./HoundsEvents";

export interface IHoundsConfig {
    apiURL: string;
    apiVersion: string;
    apiAuth: HHH.IHoundAuth;
}

function createNewRequest(auth: IHoundsConfig, params?: any, data?: any): AxiosRequestConfig {
    return {
        baseURL: auth.apiURL,
        headers: {
            version: auth.apiVersion,
        },
        params: {
            ...auth.apiAuth,
            ...params,
        },
        data: {
            ...data,
        },
    };
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

export async function checkAuthentication(config: IHoundsConfig): Promise<boolean> {
    return new Promise((resolve, reject) => {
        axios.post("/login", {}, createNewRequest(config))
        .then(() => resolve(true))
        .catch(() => resolve(false));
    });
}

export async function getWeek(weekStart: Date, config: IHoundsConfig) {
    const response = await axios.get("/api/week", createNewRequest(config, {date: weekStart}));
    return he.formatEventData(weekStart, response.data as API.IHoundAPIBooking[]);
}

export async function addDog(dog: HHH.IHoundDog, config: IHoundsConfig) {
    const apiDog = he.toApiDog(dog);
    return axios.post("/api/dogs", apiDog, createNewRequest(config));
}

export async function addEvent(event: HHH.IHoundEvent, config: IHoundsConfig) {
    const newEvent = he.toApiEvent(event);
    return axios.post("/api/events", newEvent, createNewRequest(config));
}

export async function findEvents(eventText: string, config: IHoundsConfig) {
    return axios.get("/api/find", createNewRequest(config, {searchText: eventText}));
}

export async function removeEvent(eventId: string, config: IHoundsConfig) {
    return axios.delete("/api/events/" + eventId, createNewRequest(config));
}

export async function removeDog(dogId: string, config: IHoundsConfig) {
    return axios.delete("/api/dogs/" + dogId, createNewRequest(config, {option: "force"}));
}

export async function reactivateDog(dogId: string, config: IHoundsConfig) {
    return axios.delete("/api/dogs/" + dogId, createNewRequest(config, {option: "reactivate"}));
}

export async function deactivateDog(dogId: string, config: IHoundsConfig) {
    return axios.delete("/api/dogs/" + dogId, createNewRequest(config));
}

export async function editDog(dogProfile: HHH.IHoundDog, config: IHoundsConfig) {
    const apiDog = he.toApiDog(dogProfile);
    return axios.put("/api/dogs", apiDog, createNewRequest(config));
}

export async function retrieveDog(dogId: string, config: IHoundsConfig) {
    const response = await axios.get("/api/dogs/" + dogId, createNewRequest(config));
    const dog = response.data as HHH.IHoundDog;
    for (const booking of dog.bookings) {
        booking.startDate = new Date(booking.startDate.valueOf());
        booking.endDate = new Date(booking.endDate.valueOf());
    }
    dog.id = dogId;

    return dog;
}

export async function addUser(username: string, password: string, permissions: number, config: IHoundsConfig) {
    const user = {
        password,
        permissions,
        username,
    };

    return axios.post("/api/users", user, createNewRequest(config));
}

export async function deleteUser(username: string, config: IHoundsConfig) {
    return axios.delete("/api/users/" + username, createNewRequest(config));
}

export async function changePassword(username: string, oldPassword: string, newPassword: string, config: IHoundsConfig) {
    const user = {
        newPassword,
        oldPassword,
        username,
    };

    return axios.put("/api/user/password", user, createNewRequest(config));
}
