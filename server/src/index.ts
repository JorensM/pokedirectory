//server/src/index.ts

//Core
import express, { Request, Response, Application} from 'express';
import { Database } from 'sqlite3';
import session from "express-session";

//Functions
import initEndpoints from './endpoints';

declare module 'express-session' {
    interface SessionData {
        username: string;
    }
}

const app:Application = express();

const PORT = process.env.PORT || 8000;

let db = new Database("db/main.db", (err) => {
    if(err){
        console.error("Failed connecting to database: ");
        console.error(err);
    }
    else{
        console.log("Connected to Database!");
    }
});

app.use(express.json());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: "keyboard cat"
}));

initEndpoints(app, db);

app.listen(PORT, ():void => {
    console.log(`Server running @ https://localhost:${PORT}`);
});