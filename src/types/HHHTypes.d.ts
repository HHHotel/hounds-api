export interface IHoundUser {
    username: string;
    token: string;
    permissions: number;
    id: number;
}

export interface IHoundAuth {
    username: string;
    token: string;
}

export interface IHoundEvent {
    startDate: Date;
    endDate: Date;
    type: string;
    text: string;
    id: string;
}

export interface IScheduleEvent {
    startDate?: Date;
    endDate?: Date;
    type: string;
    text: string;
    id: string;
    dogId: string;
}

export interface IHoundBooking extends IHoundEvent {
    dogId: string;
}

export interface IHoundDog {
    activeClient: boolean;
    name: string;
    clientName: string;
    id: string;
    bookings: IHoundEvent[];
}

export interface ISQLDog {
    id: string;
    dog_name: string;
    client_name: string;
}

export interface ISQLEvent extends ISQLDog {
    event_id: string;
    event_type: string;
    event_text: string;
    event_start: number;
    event_end: number;
}
