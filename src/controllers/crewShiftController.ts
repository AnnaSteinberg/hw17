import {crewShiftServiceMongo} from "../services/CrewShiftServiceMongoImpl.js";
import {Request, Response, NextFunction} from "express";


const service = crewShiftServiceMongo;

export const startShift = async (req: Request, res: Response, next: NextFunction) => {
    const tub_num= req.params.tub_num;
    const result =  service.startShift(tub_num)
    res.status(200).json(result)
}