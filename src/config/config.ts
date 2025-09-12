// import mysql, {Pool} from 'mysql2/promise'
import dotenv from 'dotenv'
import appConf from "../../app-config/app-config.json" with {type: "json"};

export interface Config {
    port:number,
    skipRoutes:string[],
    pathRoles: Record<string, string[]>,
    checkIdRoutes:string[],
    mongoUri:string,
    jwt:{
        secret:string,
        exp:string|number
    },
    timeWindowMs:number,
    // requestLimit:number,
    logLevel:string,
}
dotenv.config();

export const configuration:Config = {
    ...appConf,
    mongoUri: process.env.MONGO_URI || "dev db address",
    jwt:{
        secret: process.env.JWT_SECRET || "super-secret",
        exp: process.env.JWT_EXP || "1h"
    }
}



