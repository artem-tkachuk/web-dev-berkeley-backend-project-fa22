import mongoose, {Schema} from 'mongoose';

import { IRunner } from "../interfaces/runner";

const runnerSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    speed: {
        type: Number,
        required: true
    },
    position: {
        type: Number,
        required: true,
        default: 0
    },
    gifts: {
        type: [String],
        default: []
    }
})

export const Runner = mongoose.model<IRunner>('Runner', runnerSchema, 'runners');