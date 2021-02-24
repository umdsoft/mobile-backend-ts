import {WeekModel} from '../models/'
import {IWeek} from "../models/Weeks";
import {validationResult} from "express-validator";
import { Request, Response } from "express";

class WeekController{

    create = async (req: Request, res: Response):Promise<void>=>{
        const data:{name: string}={name: req.body.name}
        const error = validationResult(req)
        if(!error.isEmpty()){
            res.status(400).json({
                success: false,
                data: 'Required params'
            })
        } else {
            const week = new WeekModel(data)
            await week.save()
                .then((obj:IWeek) =>{
                    res.status(201).json({
                        success: true,
                        data: week
                    })
                })
                .catch((err)=>{
                    res.status(400).json({
                        success: false,
                        data: err
                    })
                })
        }

    }
    get = async (req:Request, res: Response):Promise<void>=>{
        const week = await WeekModel.find()
        res.status(200).json({
            success: true,
            data: week
        })
    }
    edit = async (req: Request, res: Response): Promise<void>=>{
        const data = {
            name: req.body.name
        }
         WeekModel.findOneAndUpdate({
             "_id":req.params.id
         },{
             '$set': data
         } , {new: true})
             .then((msg)=>{
                 if(!msg){
                     res.status(400).json({
                         success: false,
                         data: 'Info Required'
                     })
                 }
                 res.status(200).json({
                     success: true,
                     data: msg
                 })
             })
    }
    rm = async (req: Request, res: Response):Promise<void>=>{
        // @ts-ignore
        await WeekModel.findOneAndDelete({_id: req.params.id},(err,data)=>{
            if(err) throw res.send(err);
            res.status(200).json({
                success: true,
                data: []
            })
        })
    }
}

export default WeekController
