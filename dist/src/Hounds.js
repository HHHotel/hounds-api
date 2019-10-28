"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var packjson = __importStar(require("../package.json"));
var he = __importStar(require("./HoundsEvents"));
exports.axiosConfig = {
    baseURL: "http://localhost:8080",
    headers: {
        Version: packjson.version,
    },
};
function getRequestConfig(auth, requestConfig) {
    if (requestConfig) {
        return __assign(__assign(__assign({}, exports.axiosConfig), { data: __assign(__assign({}, auth), requestConfig.data) }), requestConfig);
    }
    else {
        return __assign(__assign({}, exports.axiosConfig), { data: __assign({}, auth) });
    }
}
function login(username, password) {
    return __awaiter(this, void 0, void 0, function () {
        var user, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = {
                        password: password,
                        username: username,
                    };
                    return [4 /*yield*/, axios_1.default.post("/login", user, exports.axiosConfig)];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data];
            }
        });
    });
}
exports.login = login;
function checkAuthentication(auth) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    axios_1.default.post("/login", auth, getRequestConfig(auth))
                        .then(function () { return resolve(true); })
                        .catch(function () { return resolve(false); });
                })];
        });
    });
}
exports.checkAuthentication = checkAuthentication;
function getWeek(weekStart, auth) {
    return __awaiter(this, void 0, void 0, function () {
        var requestConfig, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    requestConfig = {
                        params: {
                            date: weekStart,
                        },
                    };
                    return [4 /*yield*/, axios_1.default.get("/api/week", getRequestConfig(auth, requestConfig))];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, he.formatEventData(weekStart, response.data)];
            }
        });
    });
}
exports.getWeek = getWeek;
function addDog(dog, auth) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, axios_1.default.post("/api/dogs", dog, getRequestConfig(auth))];
        });
    });
}
exports.addDog = addDog;
function addEvent(event, auth) {
    return __awaiter(this, void 0, void 0, function () {
        var newEvent;
        return __generator(this, function (_a) {
            newEvent = he.toApiEvent(event);
            return [2 /*return*/, axios_1.default.post("/api/events", newEvent, getRequestConfig(auth))];
        });
    });
}
exports.addEvent = addEvent;
function findEvents(eventText, auth) {
    return __awaiter(this, void 0, void 0, function () {
        var requestConfig;
        return __generator(this, function (_a) {
            requestConfig = {
                params: {
                    searchText: eventText,
                },
            };
            return [2 /*return*/, axios_1.default.get("/api/find", getRequestConfig(auth, requestConfig))];
        });
    });
}
exports.findEvents = findEvents;
function removeEvent(eventId, auth) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, axios_1.default.delete("/api/events/" + eventId, getRequestConfig(auth))];
        });
    });
}
exports.removeEvent = removeEvent;
function removeDog(dogId, auth) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, axios_1.default.delete("/api/dogs/" + dogId, getRequestConfig(auth))];
        });
    });
}
exports.removeDog = removeDog;
function editDog(dogProfile, auth) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, axios_1.default.put("/api/dogs", dogProfile, getRequestConfig(auth))];
        });
    });
}
exports.editDog = editDog;
function retrieveDog(dogId, auth) {
    return __awaiter(this, void 0, void 0, function () {
        var response, dog, _i, _a, booking;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, axios_1.default.get("/api/dogs/" + dogId, getRequestConfig(auth))];
                case 1:
                    response = _b.sent();
                    dog = response.data;
                    for (_i = 0, _a = dog.bookings; _i < _a.length; _i++) {
                        booking = _a[_i];
                        booking.startDate = new Date(booking.startDate.valueOf());
                        booking.endDate = new Date(booking.endDate.valueOf());
                    }
                    dog.id = dogId;
                    return [2 /*return*/, dog];
            }
        });
    });
}
exports.retrieveDog = retrieveDog;
function addUser(username, password, permissionLevel, auth) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            user = {
                password: password,
                permissions: permissionLevel,
                username: username,
            };
            return [2 /*return*/, axios_1.default.post("/api/users", user, getRequestConfig(auth))];
        });
    });
}
exports.addUser = addUser;
function deleteUser(username, auth) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, axios_1.default.delete("/api/users/" + username, getRequestConfig(auth))];
        });
    });
}
exports.deleteUser = deleteUser;
function changePassword(username, oldPassword, newPassword, auth) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            user = {
                newPassword: newPassword,
                oldPassword: oldPassword,
                username: username,
            };
            return [2 /*return*/, axios_1.default.put("/api/user/password", user, getRequestConfig(auth))];
        });
    });
}
exports.changePassword = changePassword;
//# sourceMappingURL=Hounds.js.map