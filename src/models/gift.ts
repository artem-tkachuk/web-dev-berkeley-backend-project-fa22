import mongoose, {Schema} from 'mongoose';

import { IGift } from "../interfaces/gift";

const giftSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    boost: {
        type: Number,
        required: true
    },
    in_a_row: {
        type: Number,
        required: true,
        default: 0
    },
    gifted: {
        type: Number,
        required: true,
        default: 0
    }
})

export const Gift = mongoose.model<IGift>('Gift', giftSchema, 'gifts');