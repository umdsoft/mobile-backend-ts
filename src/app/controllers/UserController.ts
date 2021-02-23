import {IUser } from "../models/User";
import { UserModel } from "../models";
import {validationResult, Result, ValidationError} from "express-validator";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import {GenerateToken} from "../utils";
class UserController {
    register = async (req:Request,res: Response): Promise<void> =>{
        const lastDat = await UserModel.findOne().sort( { createdAt: -1 } ).exec();
        const recData: number = lastDat ? lastDat.number + 1 : 1000;
        const data:{
            role: number;
            name: string;
            phone: string;
            number: number;
        } = {
            role: req.body.role,
            name: req.body.name,
            phone: req.body.phone,
            number: recData
        }

        const error = validationResult(req);
        if(!error.isEmpty()){
            res.status(500).json({
                status: false,
                code: 10000,
                message: {
                    en: "Something went wrong! Please try again!",
                    uz: "Нимадир нотўғри бажарилди! Илтимос, яна бир бор уриниб кўринг!",
                    ru: "Что-то пошло не так! Пожалуйста, попробуйте еще раз!",
                },
                error: error,
            })
        } else {
            const user = new UserModel(data);
            await user.save()
                .then((obj:IUser)=>{
                    res.status(201).json({
                        success: true,
                        data: obj
                    })
                })
                .catch((error)=>{
                    res.status( 400 ).json( {
                        status: "Error",
                        code: 10000,
                        message: {
                            en: "Something went wrong! Please try again!",
                            uz: "Нимадир нотўғри бажарилди! Илтимос, яна бир бор уриниб кўринг!",
                            ru: "Что-то пошло не так! Пожалуйста, попробуйте еще раз!",
                        },
                        error: error,
                    } );
                })
        }

    }
    login = async (req: Request, res: Response): Promise<void>=>{
        const data:{
            phone: string;
            password: string;
        } = {
            phone: req.body.phone,
            password: req.body.password
        };
        const errors: Result<ValidationError> = validationResult( req );
        if(!errors.isEmpty()){
            res.status( 500 ).json( {
                status: "Error",
                code: 10022,
                message: {
                    en: "Something went wrong! Please try again!",
                    uz: "Нимадир нотўғри бажарилди! Илтимос, яна бир бор уриниб кўринг!",
                    ru: "Что-то пошло не так! Пожалуйста, попробуйте еще раз!",
                },
                error: errors,
            } );
        } else {
            await UserModel.findOne({phone: data.phone}, async (error, user:any)=>{
                if(error || !user){
                    return res.status( 404 ).json( {
                        status: "Error",
                        code: 10004,
                        message: {
                            en: "No information found!",
                            uz: "Маълумот топилмади!",
                            ru: "Данные не найдены!",
                        },
                    } );
                }
                if(bcrypt.compareSync(data.password , user.password)){
                   const tokenData: any =   {
                       id: user._id
                   }
                   const token = GenerateToken(tokenData)
                   return res.status(200).json({
                        success: true,
                        token: token
                    })
                } else {
                 return res.status( 403 ).json( {
                        status: "Error",
                        code: 10033,
                        message: {
                            en: "Incorrect password or email!",
                            uz: "Пароль ёки электрон почта манзили нотўғри!",
                            ru: "Неверный пароль или электронная почта",
                        },
                    } );
                }

            })
        }
    }
    logout = async ( req: Request, res: Response ) => {
        res.set(
            'Set-Cookie',
            ['token=; Max-age=0']
        );

        res.status( 204 ).json( {
            status: "success",
            message: {
                en: "You've logged out",
                uz: "Вы вышли из системы",
                ru: "Вы вышли из системы",
            },
        } );
    };
    me = async (req:Request, res: Response): Promise<void>=>{
        const id: string = res.locals.jwtPayload.data.id;
        await UserModel.findById({_id: id})
            .select({password: 0})
            .exec((err: any,user: any)=>{
                if(err || user){
                    return res.status( 404 ).json( {
                        status: "Error",
                        code: 10004,
                        message: {
                            en: "No information found!",
                            uz: "Маълумот топилмади!",
                            ru: "Данные не найдены!",
                        }
                    })
                }
                return res.status(200).json({
                    success: true,
                    user
                })
            })
    }
}
export default UserController
