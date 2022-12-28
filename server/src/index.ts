//server/src/index.ts

//Core
import express, { Request, Response, Application} from 'express';
import { Database } from 'sqlite3';
import session from "express-session";

//Functions
import initEndpoints from './endpoints';


//Type definitions for session storage
declare module 'express-session' {
    interface SessionData {
        username: string;
    }
}


//Create new Express app
const app:Application = express();

//Ports
const PORT = process.env.PORT || 8000;


//Database initialization
let db = new Database("db/main.db", (err) => {
    if(err){
        console.error("Failed connecting to database: ");
        console.error(err);
    }
    else{
        console.log("Connected to Database!");
    }
});

//This function enables support for request body parsing.
app.use(express.json());

//This initializes session storage
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: "keyboard cat"
}));

//This initializes the endpoints
initEndpoints(app, db);

//Start the server
app.listen(PORT, ():void => {
    console.log(`Server running @ https://localhost:${PORT}`);
});