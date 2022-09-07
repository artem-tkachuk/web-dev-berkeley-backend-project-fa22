import {Request, Response} from "express";
import { Gift } from "../models/gift";
import {Runner} from "../models/runner";

export const postSendGift = (req: Request, res: Response) => {
    // https://stackoverflow.com/a/6003920
    // Check that those values exist
    if (!req.body.name || !req.body.runner || !req.body.spectator) {
        res.status(424).json({
            code: 424,
            message: "Failed because invalid parameters provided!"
        })
    } else {
        const giftName = req.body.name;
        const runnerName = req.body.runner;
        const spectatorName = req.body.spectator;

        if (spectatorName[0] == giftName[0]) {
            // https://www.restapitutorial.com/httpstatuscodes.html#:~:text=The%20424%20(Failed%20Dependency)%20status,action%20and%20that%20action%20failed.
            res.status(424).json({
                code: 424,
                message: "Failed because the first letter of your name" +
                    " is the same as the first letter of the gift you wanted to give!"
            })
        } else {
            Gift.find({}, "name")
                .then(gifts => {
                    let availableGifts = gifts.map(({name}) => name);

                    if (availableGifts.includes(giftName)) {
                        Runner.findOne({name: runnerName})
                            .then(runner => {
                                if (!runner) {
                                    res.status(424).json({
                                        code: 424,
                                        message: "Failed because this runner does not exist!"
                                    })
                                } else {
                                    runner.gifts.push(giftName);

                                    runner.save(err => {
                                        if (err) {
                                            res.status(424).json({
                                                code: 424,
                                                message: "Failed because could not update list of runner's gifts in the database!"
                                            })
                                        } else {
                                            res.status(200).json({
                                                "code": 200,
                                                "Message": `Successfully sent runner ${runnerName} a gift called ${giftName}`
                                            });
                                        }
                                    });
                                }
                            })
                            .catch(err => {
                                res.status(424).json({
                                    code: 424,
                                    message: "Failed because this runner does not exist!"
                                })
                            })
                    } else {
                        res.status(424).json({
                            code: 424,
                            message: "Failed because this gift does not exist!"
                        })
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(424).json({
                        code: 424,
                        message: "Failed because could not fetch the list of available gifts!"
                    })
                })
        }
    }
};