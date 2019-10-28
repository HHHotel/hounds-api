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
Object.defineProperty(exports, "__esModule", { value: true });
var default_1 = require("./default");
function toApiEvent(event) {
    return {
        startDate: event.startDate.valueOf(),
        endDate: event.endDate.valueOf(),
        id: event.id,
        text: event.text,
        type: event.type,
        desc: "",
    };
}
exports.toApiEvent = toApiEvent;
function toApiBooking(booking) {
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
exports.toApiBooking = toApiBooking;
function toApiDog(dog) {
    return {
        bookings: dog.bookings.map(function (ev) { return toApiEvent(ev); }),
        clientName: dog.clientName,
        id: dog.id,
        name: dog.name,
    };
}
exports.toApiDog = toApiDog;
function fromApiBooking(event) {
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
exports.fromApiBooking = fromApiBooking;
function fromApiEvent(event) {
    return {
        startDate: new Date(event.startDate),
        endDate: new Date(event.endDate),
        id: event.id,
        text: event.text,
        type: event.type,
    };
}
exports.fromApiEvent = fromApiEvent;
function formatEventData(weekStart, serverEventResponse) {
    var events = [];
    // Init events out array
    for (var i = 0; i < 7; i++) {
        events[i] = [];
    }
    for (var _i = 0, serverEventResponse_1 = serverEventResponse; _i < serverEventResponse_1.length; _i++) {
        var responseEvent = serverEventResponse_1[_i];
        var event_1 = fromApiBooking(responseEvent);
        var weekStartTime = weekStart.valueOf();
        var msDiffStart = (new Date(event_1.startDate.toDateString()).valueOf() - weekStartTime);
        var msDiffEnd = (new Date(event_1.endDate.toDateString()).valueOf() - weekStartTime);
        var startDay = Math.round(msDiffStart / 1000 / 60 / 60 / 24); // convert to literal days
        var endDay = Math.round(msDiffEnd / 1000 / 60 / 60 / 24); // convert to literal days
        if (event_1.type === default_1.DEFAULT.CONSTANTS.BOARDING) {
            // Ignore days beyond current week
            if (startDay < 0) {
                startDay = 0;
            }
            if (endDay > 6) {
                endDay = 6;
            }
            // For every day from start->end a new record gets added onto events
            for (var i = startDay; i <= endDay; i++) {
                var record = getScheduleEvent(event_1, i);
                events[i].push(record);
            }
        }
        else if (startDay >= 0 && endDay <= 6 && startDay === endDay) {
            // Only add the non boarding event if it is in the current week
            events[startDay].push(getScheduleEvent(event_1, startDay));
        }
    }
    return events;
    function getScheduleEvent(event, index) {
        var record = __assign({}, event);
        // event is not a boarding no need to do anything special
        if (record.type !== default_1.DEFAULT.CONSTANTS.BOARDING) {
            return record;
        }
        var currDate = new Date(weekStart.valueOf());
        currDate.setDate(currDate.getDate() + index);
        // Switch on the day of the current week
        switch (currDate.toDateString()) {
            case (record.startDate && record.startDate.toDateString()): // Record should be an arrival
                record.endDate = record.startDate;
                record.type = default_1.DEFAULT.CONSTANTS.ARRIVING;
                break;
            case (record.endDate && record.endDate.toDateString()): // Record should be a departure
                record.startDate = record.endDate;
                record.type = default_1.DEFAULT.CONSTANTS.DEPARTING;
                break;
            default: // Record should be boarding
                record.startDate = undefined;
                record.endDate = undefined;
                record.type = default_1.DEFAULT.CONSTANTS.BOARDING;
                break;
        }
        return record;
    }
}
exports.formatEventData = formatEventData;
//# sourceMappingURL=HoundsEvents.js.map