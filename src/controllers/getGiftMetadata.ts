import {Request, Response} from "express";

import { Gift } from "../models/gift";

export const getGiftMetadata = (req: Request, res: Response) => {
    Gift.find({}, "name gifted")
        .then(giftsDict => {
            if (!giftsDict) {
                res.status(424).json({
                    code: 424,
                    message: "Failed because could not fetch the list of available gifts!"
                })
            } else {
                // Fancy way to do it I found here: https://dev.to/devtronic/javascript-map-an-array-of-objects-to-a-dictionary-3f42
                let giftsStatistics = Object.assign(
                    {},
                    ...giftsDict.map( gift => ({  [gift.name]: gift.gifted  }) )
                );

                res.status(200).json({
                    "gifts": giftsStatistics
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(424).json({
                code: 424,
                message: "Failed because could not fetch the list of available gifts!"
            })
        })
};