#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var hounds = __importStar(require("../src/Hounds"));
var houndfmt = __importStar(require("../src/HoundsUtil"));
var dates = __importStar(require("date-fns"));
var fs = require("fs");
var HOUND_BASE_URL = "http://10.0.0.247:8080";
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var auth, weekStart, week, currDay, i, _i, _a, event_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    hounds.axiosConfig.baseURL = HOUND_BASE_URL;
                    if (!fs.existsSync("credentials")) return [3 /*break*/, 2];
                    return [4 /*yield*/, loadCredentials("credentials")];
                case 1:
                    auth = _b.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, login()];
                case 3:
                    auth = _b.sent();
                    _b.label = 4;
                case 4:
                    weekStart = new Date(new Date().toLocaleDateString());
                    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
                    return [4 /*yield*/, hounds.getWeek(weekStart, auth)];
                case 5:
                    week = _b.sent();
                    currDay = new Date(weekStart.valueOf());
                    for (i = 0; i < 7; i++) {
                        console.log(dates.format(currDay, "MMM d"));
                        console.log("--------------------");
                        for (_i = 0, _a = week[i]; _i < _a.length; _i++) {
                            event_1 = _a[_i];
                            console.log(houndfmt.getTimePrepend(event_1), event_1.text);
                        }
                        currDay.setDate(currDay.getDate() + 1);
                        console.log();
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function login() {
    return __awaiter(this, void 0, void 0, function () {
        var username, password, auth;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prompt("username? ")];
                case 1:
                    username = _a.sent();
                    return [4 /*yield*/, prompt("password? ")];
                case 2:
                    password = _a.sent();
                    return [4 /*yield*/, hounds.login(username, password)];
                case 3:
                    auth = _a.sent();
                    fs.writeFileSync("credentials", auth.username + ":" + auth.token);
                    return [2 /*return*/, auth];
            }
        });
    });
}
function loadCredentials(path, sep) {
    return __awaiter(this, void 0, void 0, function () {
        var data, auth, validAuth;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = fs.readFileSync(path, { encoding: "utf-8" }).split(sep || ":");
                    auth = {
                        username: data[0],
                        token: data[1],
                    };
                    return [4 /*yield*/, hounds.checkAuthentication(auth)];
                case 1:
                    validAuth = _a.sent();
                    if (!!validAuth) return [3 /*break*/, 3];
                    return [4 /*yield*/, login()];
                case 2:
                    auth = _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/, auth];
            }
        });
    });
}
function prompt(prmt) {
    var readline = require("readline");
    var r1 = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise(function (resolve, reject) {
        r1.question(prmt, function (answer) {
            if (answer) {
                resolve(answer);
                r1.close();
            }
            else {
                reject(new Error());
                r1.close();
            }
        });
    });
}
main().catch(function (err) {
    console.error("ERROR", err.message);
});
//# sourceMappingURL=hnds.js.map