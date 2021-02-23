import express from "express";
import JWT from 'jsonwebtoken'
import { UserModel} from "../models";

export default async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<void> =>{

    let token: string;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
     token = req.headers.authorization.split(' ')[1]
    }
    if(!token){
        return next('Invalid token')
    }
    try{
        const decode:any = JWT.verify(token,process.env.JWT_SECRET)
        req["user"] = await UserModel.findById(decode.id);
        next();
    } catch (e) {
        return next('No authorize')
    }
}
