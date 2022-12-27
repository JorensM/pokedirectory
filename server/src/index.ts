import express, {Request,Response,Application} from 'express';
import { request } from 'http';

const app:Application = express();

const PORT = process.env.PORT || 8000;

app.get("/", (req:Request, res:Response):void => {
    res.send("Hello from server!")
});

app.get("/test", (req:Request, res:Response):void => {
    res.json("Hello to client from server!");
});

app.listen(PORT, ():void => {
    console.log(`Server running @ https://localhost:${PORT}`);
});