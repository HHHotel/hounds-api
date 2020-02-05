export interface IHoundAPIDog {
    activeClient: boolean;
    name: string;
    clientName: string;
    id: string;
    bookings: IHoundAPIEvent[];
}

export interface IHoundAPIBooking extends IHoundAPIEvent {
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
