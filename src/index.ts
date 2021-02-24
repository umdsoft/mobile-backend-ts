import express from 'express';
import { createServer } from 'http';
import bodyParser from 'body-parser'
import createRoutes from "./routes";
const app = express();
const http = createServer( app );
import './database/connection';
app.use(bodyParser.json());
createRoutes(app);

// bu joyda kod joylashadi

const PORT = process.env.PORT || 3003;

http.listen( PORT, function () {
    console.log( `Server ishga tushdi` );
} );
