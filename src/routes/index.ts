import express from 'express'
import cors from "cors";
const app = express()
import {
    UserCtrl, WeekCtrl
} from "../app/controllers";
app.use( cors() );
const options: cors.CorsOptions = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: true,
    //origin: "*",
    optionsSuccessStatus: 204, // some legacy browsers (IE11, various SmartTVs) choke on 204
    preflightContinue: false
};
//enable pre-flight
app.options( "*", cors( options ) );
const createRoutes = (app: express.Express)=>{
    // For User
    const UserController = new UserCtrl()
    app.post('/api/user/register', UserController.register)
    app.post('/api/user/login', UserController.login)
    app.post('/api/user/logout', UserController.logout)
    app.get('/api/user/me', UserController.me)

    // From Weeks
    const WeekController = new WeekCtrl()
    app.post('/api/week/create',WeekController.create)
    app.get('/api/week/all',WeekController.get)
    app.put('/api/week/:id',WeekController.edit)
    app.delete('/api/week/:id',WeekController.rm)
}

export default createRoutes;
