import {Request, Response} from "express";
import { Runner } from "../models/runner";

export const postRegisterRunner = (req: Request, res: Response) => {
    if (!req.body.name || !req.body.speed) {
        res.status(424).json({
            code: 424,
            message: "Failed because invalid parameters provided!"
        })
    } else {
        const runnerName = req.body.name;
        const runnerSpeed = req.body.speed;

        const runner = new Runner({
            name: runnerName,
            speed: runnerSpeed,
            position: 0,
            gifts: []
        });

        runner.save(err => {
            if (err) {
                res.status(424).json({
                    code: 424,
                    message: "Failed because could not update create runner in the database!"
                })
            } else {
                res.status(200).json({
                    "code": 200,
                    "Message": `Successfully inserted runner ${runnerName} with speed ${runnerSpeed}`
                });
            }
        });
    }
};