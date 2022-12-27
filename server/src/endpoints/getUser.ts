//server/src/endpoints/getUser.ts

//Types
import { Application, Request, Response } from "express";
import { Database } from "sqlite3";

//Functions
import getUserFn from "../fn/getUserFn";

export default function getUser(app: Application, db: Database){
    app.get("/getUser", (req: Request, res: Response):void => {
        const username = req.session.username;

        if(username){
            getUserFn(db, username)
            .then(user => {
                res.json(user);
            })
            .catch(err => {
                console.error("Error getting user");
                console.error(err);
                res.json(false);
            })
        }else{
            res.json(false);
        }

    });
}