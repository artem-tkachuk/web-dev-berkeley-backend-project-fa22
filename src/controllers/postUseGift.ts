import {Request, Response} from "express";
import { Gift } from "../models/gift";
import {Runner} from "../models/runner";

export const postUseGift = (req: Request, res: Response) => {
    // https://stackoverflow.com/a/6003920
    // Check that those values exist
    if (!req.body.runner || !req.body.boost ) {
        res.status(424).json({
            code: 424,
            message: "Failed because invalid parameters provided!"
        })
    } else {
        const runnerName = req.body.runner;
        const giftName = req.body.boost;

        Runner.findOne({name: runnerName})
            .then(runner => {
                if (!runner) {
                    res.status(424).json({
                        code: 424,
                        message: "Failed because this runner does not exist!"
                    })
                } else {
                    if (runner.gifts.includes(giftName)) {
                        Gift.findOne({name: giftName})
                            .then(gift => {
                                if (!gift) {
                                    res.status(424).json({
                                        code: 424,
                                        message: "Failed because this gift does not exist!"
                                    })
                                } else {
                                    // Check that the gift was not applied 4 times in a row globally
                                    // This gift was already applied 3 times in a row, and now we intend 4th
                                    if (gift.in_a_row == 3) {
                                        // Fail if it was used 3 times already
                                        res.status(424).json({
                                            code: 424,
                                            message: "Failed because this gift was applied 4 times in a row! Try giving the other gift"
                                        })
                                    } else {
                                        gift.in_a_row += 1;
                                        // set in_a_row for all gifts to 0
                                        Gift.updateMany({}, {in_a_row: 0})
                                            .then(() => {
                                                // Apply to speed
                                                runner.speed += gift.boost;
                                                // remove from dict of gifts for the current runner
                                                // @ts-ignore
                                                const indexOfUsedGift = runner.gifts.indexOf(giftName)
                                                runner.gifts.splice(indexOfUsedGift, 1);
                                                // TODO fix
                                                // TODO it removes all occurrences of the gifts of the same type
                                                // TODO should only remove the first instance

                                                // Save the runner
                                                runner.save(err => {
                                                    if (err) {
                                                        res.status(424).json({
                                                            code: 424,
                                                            message: "Failed because could not update list of runner's gifts in the database!"
                                                        })
                                                    } else {
                                                        // Save the gift
                                                        gift.save(err => {
                                                            if (err) {
                                                                res.status(424).json({
                                                                    code: 424,
                                                                    message: "Failed because could not update current gift's document!"
                                                                })
                                                            } else {
                                                                res.status(200).json({
                                                                    "code": 200,
                                                                    "Message": `Runner ${runnerName} successfully used a gift called ${giftName}`
                                                                });
                                                            }
                                                        });
                                                    }
                                                });
                                            })
                                            .catch(err => {
                                                console.log(err);
                                                res.status(424).json({
                                                    code: 424,
                                                    message: "Failed because could not properly update counters for each gift!"
                                                })
                                            })
                                    }
                                }
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(424).json({
                                    code: 424,
                                    message: "Failed because could not fetch the information for the desired gift!"
                                })
                            })
                    } else {
                        res.status(424).json({
                            code: 424,
                            message: "Failed because this gift does not exist for the current runner!"
                        })
                    }
                }
            })
            .catch(err => {
                res.status(424).json({
                    code: 424,
                    message: "Failed because this runner does not exist!"
                })
            })
    }
};




