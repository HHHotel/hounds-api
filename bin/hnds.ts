#!/usr/bin/env node

import * as hounds from "../src/Hounds";
import * as houndfmt from "../src/HoundsUtil";
import * as HHH from "../src/types/HHHTypes";
import * as dates from "date-fns";
import fs = require("fs");

const HOUND_BASE_URL = "http://10.0.0.247:8080";

async function main() {
    hounds.axiosConfig.baseURL = HOUND_BASE_URL;

    let auth: HHH.IHoundAuth;

    if (fs.existsSync("credentials")) {
        auth = await loadCredentials("credentials");
    } else {
        auth = await login();
    }

    const weekStart = new Date(new Date().toLocaleDateString());
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());

    const week = await hounds.getWeek(weekStart, auth);

    const currDay = new Date(weekStart.valueOf());

    for (let i = 0; i < 7; i++) {
        console.log(dates.format(currDay, "MMM d"));
        console.log("--------------------");
        for (const event of week[i]) {
            console.log(houndfmt.getTimePrepend(event), event.text);
        }

        currDay.setDate( currDay.getDate() + 1 );
        console.log();
    }
}

async function login() {
    const username = await prompt("username? ");
    const password = await prompt("password? ");

    const auth = await hounds.login(username, password);
    fs.writeFileSync("credentials", auth.username + ":" + auth.token);
    return auth;
}

async function loadCredentials(path: string, sep?: string) {
    const data = fs.readFileSync(path, { encoding: "utf-8" }).split(sep || ":");

    let auth = {
        username: data[0],
        token: data[1],
    };

    const validAuth = await hounds.checkAuthentication(auth);

    if (!validAuth) {
        auth = await login();
    }

    return auth;
}
function prompt(prmt: string): Promise<string> {
    const readline = require("readline");
    const r1 = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve, reject) => {
        r1.question(prmt, (answer: string) => {
            if (answer) {
                resolve(answer);
                r1.close();
            } else {
                reject(new Error());
                r1.close();
            }
        });
    });
}

main().catch((err) => {
    console.error("ERROR", err.message);
});