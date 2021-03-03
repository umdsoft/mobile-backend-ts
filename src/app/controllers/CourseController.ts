import {validationResult} from "express-validator";
import { Request, Response } from "express";
import { ICourse } from "../models/Course";
import { CourseModel } from "../models";
import {IWeek} from "../models/Weeks";

class CourseController{
    create = async (req: Request, res: Response):Promise<void> =>{
        const data:{
            name: string,
            type: string,
            video: string,
            week: IWeek | string,
            description: string,
            price: string
        } = {
            name: req.body.name,
            type: req.body.type,
            video: req.file.path,
            week: req.body.week,
            description: req.body.description,
            price: req.body.price
        }
        const error = validationResult(req)
        if(!error.isEmpty()){
            res.status(404).json({
                success: false,
                data: 'data is required'
            })
        } else {
        const course = new CourseModel(data)
        await course.save()
            .then((obj:ICourse)=>{
                res.status(201).json({
                    success: true,
                    data: course
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
    getAll = async (req: Request, res: Response):Promise<void>=>{
        await CourseModel.find()
            .sort({updatedAt: -1,createdAt: -1})
            .exec((err,data)=>{
                if(err) throw res.send(err);
                res.status(200).json({
                    success: true,
                    data: data
                })
            })
    }
    getByType = async (req: Request, res: Response):Promise<void>=>{
        await CourseModel.aggregate(
            [
                {$match: {type: req.query.type}},
                {$group:{_id: "$week"}},
                {$project: {
                    _id: 1,
                        week:1,
                        name: 1,
                        description:1,
                        video:1,
                        price:1
                    }}
            ]
        )
            .exec((err,data)=>{
                if(err) throw res.send(err);
                res.status(200).json({
                    success: true,
                    data: data
                })
            })
    }
    getById = async (req: Request, res: Response):Promise<void>=>{
        await CourseModel.findById({_id: req.params.id},(err,data)=>{
            if(err) throw res.send(err);
            res.status(200).json({
                success: true,
                data: data
            })
        })
    }
    rm = async (req: Request, res: Response):Promise<void>=>{
        // @ts-ignore
        await CourseModel.findByIdAndDelete({_id: req.params.id},(err,data)=>{
            if(err) throw res.send(err);
            res.status(200).json({
                success: true,
                data: []
            })
        })
    }
}

export default CourseController
