import {Request, Response} from "express";

export const get404 = (req: Request, res: Response) => {
    res.status(404).json({
        "code": 404,
        "message": "URL not found!"
    });
};