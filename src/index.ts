import express from 'express';
import { createServer } from 'http';
import bodyParser from 'body-parser';
import path from "path";
import createRoutes from "./routes";
const app = express();
const http = createServer( app );
import './database/connection';
app.use(bodyParser.json());
createRoutes(app);
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
// bu joyda kod joylashadi

const PORT = process.env.PORT || 3003;

http.listen( PORT, function () {
    console.log( `Server ishga tushdi` );
} );
