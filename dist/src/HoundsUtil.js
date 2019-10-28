"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var dates = __importStar(require("date-fns"));
var default_1 = require("./default");
function getTimePrepend(event) {
    if (!event.startDate || !event.endDate) {
        return "";
    }
    if (event.startDate.getHours() >= 12 === event.endDate.getHours() >= 12) {
        var start = dates.format(event.startDate, "h:mm");
        var end = dates.format(event.endDate, "h:mm a");
        return "(" + start + " - " + end + ")";
    }
    else {
        var start = dates.format(event.startDate, "h:mm a");
        var end = dates.format(event.endDate, "h:mm a");
        return "(" + start + " - " + end + ")";
    }
}
exports.getTimePrepend = getTimePrepend;
function compareScheduleEvents(a, b) {
    if (a.type === default_1.DEFAULT.CONSTANTS.BOARDING) {
        return -1;
    }
    if (b.type === default_1.DEFAULT.CONSTANTS.BOARDING) {
        return 1;
    }
    if (!a.endDate || !a.startDate || !b.startDate || !b.endDate) {
        return 0;
    }
    var aTime = a.startDate.getHours() * 60 + a.startDate.getMinutes();
    var bTime = b.startDate.getHours() * 60 + b.startDate.getMinutes();
    var timeDiff = aTime - bTime;
    if (timeDiff === 0) {
        var aIndex = default_1.DEFAULT.CONSTANTS.EVENT_TYPES.indexOf(a.type);
        var bIndex = default_1.DEFAULT.CONSTANTS.EVENT_TYPES.indexOf(b.type);
        return aIndex - bIndex;
    }
    else {
        return timeDiff;
    }
}
exports.compareScheduleEvents = compareScheduleEvents;
//# sourceMappingURL=HoundsUtil.js.map