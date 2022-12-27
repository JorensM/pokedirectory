//server/src/endpoints/loginUser.ts

//Core
import { Application, Request, Response } from "express";
import { Database } from "sqlite3";

//Functions
import validateUser from "../fn/validateUser";

export default function loginUser(app: Application, db: Database){
    app.post("/loginUser", (req: Request, res: Response):void => {

        const username = req.body.username;
        const password = req.body.password;

        validateUser(db, username, password)
        .then(valid => {
            if(valid){
                req.session.username = username;
                res.json(true);
            }else{
                req.session.username = undefined;
                res.json(false);
            }
        })
        .catch(err => {
            console.error("Error logging in");
            console.error(err);
            res.json(false);
        }) 
    });
}