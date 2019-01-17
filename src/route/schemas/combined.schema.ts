// tslint:disable-next-line:no-var-requires
const mongoose: any = require('mongoose');

export const combine: any = new mongoose.Schema({
    train: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
    },
    bus: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
    },
    all: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
    },
});

export const combinedSchema: any = new mongoose.Schema({
    routeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    combined: {
        type: [combine],
        required: true,
    },
});

// tslint:disable-next-line:interface-name
export interface Combine {
    readonly routeId: string;
    readonly combined: [ICombined];
}

export interface ICombine extends Document, Combine {
}

export interface ICombined {
    train: string[];
    bus: string[];
    all: string[];
}
