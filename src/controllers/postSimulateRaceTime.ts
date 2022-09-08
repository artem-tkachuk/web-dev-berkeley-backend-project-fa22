import {Request, Response} from "express";
import {Runner} from "../models/runner";

export const postSimulateRaceTime = (req: Request, res: Response) => {
    // https://stackoverflow.com/a/6003920
    // Check that those values exist
    if (!req.body.seconds || isNaN(parseInt(req.body.seconds))) {
        res.status(424).json({
            code: 424,
            message: "Failed because invalid parameters provided!"
        })
    } else {
        const seconds = parseInt(req.body.seconds);

        Runner
            .find({})
            .then(runners => {
                runners.forEach(r => {
                   r.position += r.speed * seconds;
                });

                Runner
                    .bulkSave(runners)
                    .then(() => {
                        runners.sort((r1, r2) => r2.position - r1.position)

                        res.status(200).json({
                            "runners": runners.map(r => r.name)
                        });
                    })
                    .catch(err => {
                        res.status(424).json({
                            code: 424,
                            message: "Failed because could not update positions of the runners!!"
                        })
                    })
            })
            .catch(err => {
                res.status(424).json({
                    code: 424,
                    message: "Failed because could not get list of all runners in the game!"
                })
            })

    }
};