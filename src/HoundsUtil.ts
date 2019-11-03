import * as HHH from "./types/HHHTypes";
import * as dates from "date-fns";
import { DEFAULT } from "./default";

export function getTimePrepend(event: HHH.IScheduleEvent) {
    if (!event.startDate || !event.endDate) {
        return "";
    }

    if (dates.compareAsc(event.startDate, event.endDate) === 0) {
        return "(" + dates.format(event.startDate, "h:mm a") + ")";
    } else if (event.startDate.getHours() >= 12 === event.endDate.getHours() >= 12) {
        const start = dates.format(event.startDate, "h:mm");
        const end = dates.format(event.endDate, "h:mm a");
        return "(" + start + " - " + end + ")";
    } else {
        const start = dates.format(event.startDate, "h:mm a");
        const end = dates.format(event.endDate, "h:mm a");
        return "(" + start + " - " + end + ")";
    }
}

export function compareScheduleEvents(a: HHH.IScheduleEvent, b: HHH.IScheduleEvent) {
    if (a.type === DEFAULT.CONSTANTS.BOARDING) {
        return -1;
    }

    if (b.type === DEFAULT.CONSTANTS.BOARDING) {
        return 1;
    }

    if (!a.endDate || !a.startDate || !b.startDate || !b.endDate) {
        return 0;
    }

    const aTime = a.startDate.getHours() * 60 + a.startDate.getMinutes();
    const bTime = b.startDate.getHours() * 60 + b.startDate.getMinutes();

    const timeDiff = aTime - bTime;

    if (timeDiff === 0) {
        const aIndex = DEFAULT.CONSTANTS.EVENT_TYPES.indexOf(a.type);
        const bIndex = DEFAULT.CONSTANTS.EVENT_TYPES.indexOf(b.type);
        return aIndex - bIndex;
    } else {
        return timeDiff;
    }

}