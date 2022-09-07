import mongoose, {Document, Types} from "mongoose";

export interface IRunner extends Document {
    //properties
    name: string,
    speed: number,
    position: number,
    gifts: [string],
}