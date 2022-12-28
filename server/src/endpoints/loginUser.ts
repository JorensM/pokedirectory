//server/src/endpoints/loginUser.ts

//Core
import { Application, Request, Response } from "express";
import { Database } from "sqlite3";

//Functions
import validateUser from "../fn/validateUser";

//Endpoint for logging in the user
export default function loginUser(app: Application, db: Database){
    //Add endpoint
    app.post("/loginUser", (req: Request, res: Response):void => {

        //Get username and password from request body
        const username = req.body.username;
        const password = req.body.password;

        //Validate username and password combo
        validateUser(db, username, password)
        .then(valid => {

            //Check if combo is valid
            if(valid){
                //If valid, set session variable "username" to the user's username
                req.session.username = username;
                //Return true as response
                res.json(true);
            }else{
                //If not valid, set session variable "username" to undefined
                req.session.username = undefined;
                //Return false as response
                res.json(false);
            }
        })
        //Error handling
        .catch(err => {
            console.error("Error logging in: ");
            console.error(err);

            //Return false as response
            res.json(false);
        }) 
    });
}