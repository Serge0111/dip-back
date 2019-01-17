// tslint:disable-next-line:no-var-requires
const mongoose: any = require('mongoose');

export const routeSchema: any = new mongoose.Schema({
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    dateFrom: {
        type: Date,
        required: true,
    },
    dateTo: {
        type: Date,
        required: true,
    },
});

// tslint:disable-next-line:interface-name
export interface Ticket {
    readonly from: string;
    readonly to: string;
    readonly dateFrom: Date;
    readonly dateTo: Date;
}

export interface ITicket extends Document, Ticket {
}
