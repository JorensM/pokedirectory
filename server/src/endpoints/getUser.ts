//server/src/endpoints/getUser.ts

//Types
import { Application, Request, Response } from "express";
import { Database } from "sqlite3";

//Functions
import getUserFn from "../fn/getUserFn";

//Endpoint to retrive currently logged in user
export default function getUser(app: Application, db: Database){
    app.get("/getUser", (req: Request, res: Response):void => {

        //Get "username" session variable
        const username = req.session.username;

        //If username is defined, that means that the user is logged in.
        if(username){
            //Retrive the logged in user data
            getUserFn(db, username)
            .then(user => {
                //Return the user as response
                res.json(user);
            })
            //Error handling
            .catch(err => {
                console.error("Error getting user");
                console.error(err);
                //Return false as response
                res.json(false);
            })
        }
        //If username is undefined, then user is not logged in
        else{
            //Return false as response
            res.json(false);
        }

    });
}