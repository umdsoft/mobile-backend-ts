import express from "express";
export default (...roles): Promise<void> =>{
    // @ts-ignore
    return (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void>=>{
        if(!roles.includes(req["user"].role)){
            // @ts-ignore
            return next('invalid role')
        }
        next();
    }
}
