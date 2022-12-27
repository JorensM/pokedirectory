//server/src/index.ts

//Core
import express, { Request, Response, Application} from 'express';
import { Database } from 'sqlite3';

//Functions
import initEndpoints from './endpoints';

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

initEndpoints(app, db);

app.get("/", (req:Request, res:Response):void => {
    res.send("Hello from server!")
});

app.get("/test", (req:Request, res:Response):void => {
    res.json("Hello to client from server!");
});

app.listen(PORT, ():void => {
    console.log(`Server running @ https://localhost:${PORT}`);
});