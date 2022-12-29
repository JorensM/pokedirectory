//server/src/endpoints/setFavorite.ts

//Types
import { Application, Request, Response } from "express";
import { Database } from "sqlite3";
import getUserFn from "../fn/getUserFn";
import User from "../types/User";

//Endpoint to set/unset favorite Pokemon for a user
export default function setFavorite(app: Application, db :Database){

    //Create endpoint
    app.post("/setFavorite", (req: Request, res: Response):void => {

        //POST parameters
        //Id of Pokemon
        const id = req.body.id;
        //Whether the Pokemon is to be favorited or unfavorited
        const favorite = req.body.favorite;

        const username = req.session.username;
        
        //Check if user is logged in
        if(username){
            //If user is logged in, proceed

            //get user
            getUserFn(db, username)
            .then(user => {
                //Check if user was returned
                if(user !== null){

                    //Get favorites from the user
                    let favorites = user.favorites;
                    //Get index of specified Pokemon's id from favorites
                    const index = favorites.indexOf(id.toString());

                    
                    if(favorite){
                        //If Pokemon is to be favorited
                        //Check if Pokemon is already on the list, and add if false
                        if(index === -1){
                            favorites.push(id);
                        }
                    }
                    else if(!favorite){
                        //If Pokemon is to be unfavorited
                        //Check if Pokemon is already on the list, and remove if true
                        if(index !== -1){
                            favorites.splice(index, 1);
                        }
                    }

                    //Convert favorites array to string
                    const favs_str = favorites.join(",")
                    
                    //Update favorites data in database
                    db.run(`UPDATE users SET favorites="${favs_str}" WHERE username="${username}"`, err => {
                        //Error handling
                        if(err){
                            console.error("Error updating user's favorites column: ");
                            console.error(err);
                        }else{
                            //Return true as response.
                            res.json(true);
                        }
                    })
                }else{
                    //Return false as response if no user was found
                    res.json(false);
                }
            })
            .catch(err => {
                console.error("Error getting user: ");
                console.error(err);
                res.json(false);
            })
        }else{

        }
    });
}