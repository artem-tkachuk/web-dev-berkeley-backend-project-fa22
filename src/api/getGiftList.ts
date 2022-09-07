import request from "request";

import { Gift } from "../models/gift";
import {Application} from "express";

export const getGiftList = (app: Application, port: number) => {
    // TODO check if this is defined
    const GIFTS_URL = process.env.GIFTS_URL!;

    request(GIFTS_URL, { json: true },  (err, res, body) => {
        if (err) {
            // TODO handle error
        } else {
            // TODO check that the db connection succeeded. Err parameter
            // TODO handle checks to see if API provided the correct call
            console.log(body);
            // Destructuring syntax
            // @ts-ignore
            const gifts = body.map(({name, boost}) => {
                return {
                    "name": name,
                    "boost": boost,
                    "in_a_row": 0,
                    "gifted": 0
                }
            });

            Gift.deleteMany({})
                .then((succeeded) => {
                    if (!succeeded) {
                        console.log(`Could not delete previously stored gifts: ${err}`);
                    } else {
                        console.log(`Deleted any previously stored gifts to refresh inventory!`);

                        Gift.insertMany(gifts)
                            .then(() => {
                                console.log("Gifts are now in the Database!");
                                // Finally launch the app
                                app.listen(port);
                                console.log(`App listens on port ${port}`);
                            })
                            .catch(err => {
                                console.log(err);
                                // TODO handle error
                            })
                    }
                })
                .catch(err => {
                    console.log(err);
                    // TODO handle error
                })
        }
    });
};