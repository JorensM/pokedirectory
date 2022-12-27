//server/src/endpoints/logoutUser.ts

//Types
import { Application, Request, Response } from "express";

export default function logoutUser(app: Application){
    app.get("/logoutUser", (req: Request, res: Response):void => {
        req.session.username = undefined;
        res.json(true);
    });
}