import * as HHH from "./types/HHHTypes";
import * as API from "./types/HHHApiTypes";
export declare function toApiEvent(event: HHH.IHoundEvent): API.IHoundAPIEvent;
export declare function toApiBooking(booking: HHH.IHoundBooking): API.IHoundAPIBooking;
export declare function toApiDog(dog: HHH.IHoundDog): API.IHoundAPIDog;
export declare function fromApiBooking(event: API.IHoundAPIBooking): HHH.IHoundBooking;
export declare function fromApiEvent(event: API.IHoundAPIEvent): HHH.IHoundEvent;
export declare function formatEventData(weekStart: Date, serverEventResponse: API.IHoundAPIBooking[]): HHH.IScheduleEvent[][];
