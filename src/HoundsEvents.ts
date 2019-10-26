import * as HHH from "./types/HHHTypes";
import * as API from "./types/HHHApiTypes";
import DEFAULT from "./default";

export function toApiEvent(event: HHH.IHoundEvent): API.IHoundAPIEvent {
    return {
        startDate: event.startDate.valueOf(),
        endDate: event.endDate.valueOf(),
        id: event.id,
        text: event.text,
        type: event.type,
        desc: "",
    };
}

export function toApiBooking(booking: HHH.IHoundBooking): API.IHoundAPIBooking {
    return {
        dogId: booking.dogId,
        startDate: booking.startDate.valueOf(),
        endDate: booking.endDate.valueOf(),
        id: booking.id,
        text: booking.text,
        type: booking.type,
        dogName: booking.dogName,
        clientName: booking.clientName,
        desc: "",
    };
}

export function toApiDog(dog: HHH.IHoundDog): API.IHoundAPIDog {
    return {
        bookings: dog.bookings.map((ev) => toApiEvent(ev)),
        clientName: dog.clientName,
        id: dog.id,
        name: dog.name,
    };
}

export function fromApiBooking(event: API.IHoundAPIBooking): HHH.IHoundBooking {
    return {
        startDate: new Date(event.startDate),
        endDate: new Date(event.endDate),
        id: event.id,
        dogId: event.dogId,
        dogName: event.dogName,
        clientName: event.clientName,
        type: event.type,
        text: event.text,
    };
}

export function fromApiEvent(event: API.IHoundAPIEvent): HHH.IHoundEvent {
    return {
        startDate: new Date(event.startDate),
        endDate: new Date(event.endDate),
        id: event.id,
        text: event.text,
        type: event.type,
    };
}

export function formatEventData(weekStart: Date, serverEventResponse: API.IHoundAPIBooking[]): HHH.IHoundEvent[][] {
    const events: HHH.IHoundEvent[][] = [];

    // Init events out array
    for (let i = 0; i < 7; i++) {
        events[i] = [];
    }

    function getScheduleEvent(event: HHH.IHoundBooking, index: number): HHH.IHoundEvent {
        const record: HHH.IHoundEvent = {
            startDate: event.startDate,
            endDate: event.endDate,
            type: event.type,
            text: event.text,
            id: event.dogId ? event.dogId : event.id,
        };

        // event is not a boarding no need to do anything special
        if (record.type !== DEFAULT.CONSTANTS.BOARDING) {
            return record;
        }

        const currDate = new Date(weekStart.valueOf());
        currDate.setDate(currDate.getDate() + index);

        // Switch on the day of the current week
        switch (currDate.toDateString()) {
            case (record.startDate.toDateString()): // Record should be an arrival
                record.type = DEFAULT.CONSTANTS.ARRIVING;
                break;
            case (record.endDate.toDateString()): // Record should be a departure
                record.type = DEFAULT.CONSTANTS.DEPARTING;
                break;
            default: // Record should be boarding
                record.type = DEFAULT.CONSTANTS.BOARDING;
                break;
        }

        return record;
    }

    for (const responseEvent of serverEventResponse) {
        const event = fromApiBooking(responseEvent);

        const weekStartTime = weekStart.valueOf();

        const msDiffStart = (new Date(event.startDate.toDateString()).valueOf() - weekStartTime);
        const msDiffEnd = (new Date(event.endDate.toDateString()).valueOf() - weekStartTime);

        let startDay = Math.round(msDiffStart / 1000 / 60 / 60 / 24); // convert to literal days
        let endDay = Math.round(msDiffEnd / 1000 / 60 / 60 / 24); // convert to literal days

        if (event.type === DEFAULT.CONSTANTS.BOARDING) {

            // Ignore days beyond current week
            if (startDay < 0) { startDay = 0; }
            if (endDay > 6) { endDay = 6; }

            // For every day from start->end a new record gets added onto events
            for (let i = startDay; i <= endDay; i++) {
                const record = getScheduleEvent(event, i);
                events[i].push(record);
            }
        } else if (startDay >= 0 && endDay <= 6 && startDay === endDay) {
            // Only add the non boarding event if it is in the current week
            events[startDay].push(getScheduleEvent(event, startDay));
        }
    }
    return events;
}
