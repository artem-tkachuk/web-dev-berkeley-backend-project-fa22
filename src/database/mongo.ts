import mongoose from 'mongoose';
import { Application } from 'express';

import {getGiftList} from "../api/getGiftList";

const mongoUrl = process.env.MONGO_URL!;  // TODO check that this value is not null

let mongo = (app: Application, port: number) => {
    mongoose
        .connect(mongoUrl,  (err) => {
            if (!err) {
                console.log('Connected to mongo!');
                getGiftList(app, port);
            } else {
                console.log(err)
                // TODO handle errors, maybe send a 404 or something...?
            }
        })
}

export default mongo;