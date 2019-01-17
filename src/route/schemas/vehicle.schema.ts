// tslint:disable-next-line:no-var-requires
const mongoose: any = require('mongoose');

export const vehicleSchema: any = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    routeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
});

// tslint:disable-next-line:interface-name
export interface Vehicle {
    readonly type: string;
    readonly number: string;
    readonly routeId: string;
}

export interface ITicket extends Document, Vehicle {
}
