import {Request, Response} from "express";
import { Runner } from "../models/runner";

export const postRegisterRunner = (req: Request, res: Response) => {
    const runnerName = req.body.name;
    const runnerSpeed = req.body.speed;

    // TODO check that those values exist

    const runner = new Runner({
       name: runnerName,
       speed: runnerSpeed,
       position: 0,
       gifts: []
    });

    runner.save(err => {
       if (err) {
           // TODO handle error
       } else {
           res.status(200).json({
               "code": 200,
                "Message": `Successfully inserted user ${runnerName} with speed ${runnerSpeed}`
           });
       }
    });
};