//Types
import { Database } from "sqlite3";
import { Application, Request, Response } from "express";

//Functions
import { queryDB } from "fn/db";
import getUserFn from "../fn/getUserFn";
import registerUserFn from "../fn/registerUserFn";

export default function registerUser(app: Application, db: Database){
    app.post("/registerUser", (req: Request, res: Response):void => {

        //Username and password passed as POST parameters
        const username = req.body.username;
        const password = req.body.password;

        //console.log("aaa");

        //Check if username is taken, and register if not
        getUserFn(db, username)
        .then(response => {
            //Check if username is taken
            if(response === null){
                //If username is not taken, register new user
                registerUserFn(db, username, password);
                res.json(true);
            }else{
                //Return false if username is taken
                res.json(false);
            }
        })
        .catch(err => {
            console.error(err);
            res.json(false);
        })
    })

    // return new Promise((resolve, reject) => {
        
    // })
}