import mongoose, {Document, Types} from "mongoose";

export interface IGift extends Document {
    //properties
    name: string,
    boost: number,
    in_a_row: number,
    gifted: number
}