export interface IHoundAPIDog {
    name: string;
    clientName: string;
    id: string;
    bookings: IHoundAPIEvent[];
}

export interface IHoundAPIBooking extends IHoundAPIEvent {
    dogName: string;
    clientName: string;
    dogId: string;
}

export interface IHoundAPIEvent {
    startDate: number;
    endDate: number;
    desc: string;
    type: string;
    text: string;
    id: string;
}
