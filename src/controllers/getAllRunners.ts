import {Request, Response} from "express";
import { Runner } from "../models/runner";

export const getAllRunners = (req: Request, res: Response) => {
    Runner.find({}, "name")
        .then(runners => {
            res.status(200).json({
                "runners": runners.map(runner => runner.name)
            });
        })
        .catch(err => {
            console.log(err);
            res.status(424).json({
                code: 424,
                message: "Failed because could not fetch the list of available runners!"
            })
        })
};