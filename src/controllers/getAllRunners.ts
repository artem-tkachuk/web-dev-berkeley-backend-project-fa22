import {Request, Response} from "express";
import { Runner } from "../models/runner";

export const getAllRunners = (req: Request, res: Response) => {
    // TODO check that the db connection succeeded. Err parameter
    Runner.find({}).select("name").then(runners => {
        res.status(200).json({
            "runners": runners.map(runner => runner.name)
        });
    });
};