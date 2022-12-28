//server/src/endpoints/logoutUser.ts

//Types
import { Application, Request, Response } from "express";

//Endpoint to logout the user
export default function logoutUser(app: Application){

    //Create endpoint
    app.get("/logoutUser", (req: Request, res: Response):void => {
        //Set "username" session variable to undefined
        req.session.username = undefined;

        //Return true as response
        res.json(true);
    });
}