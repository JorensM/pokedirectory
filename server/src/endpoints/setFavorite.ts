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
                    
                    //Update user's favorites data in database
                    db.run(`UPDATE users SET favorites="${favs_str}" WHERE username="${username}"`, err => {
                        //Error handling
                        if(err){
                            console.error("Error updating user's favorites column: ");
                            console.error(err);
                        }else{
                            //Return true as response.
                            //res.json(true);
                        }
                    })

                    //Set most_favorited Pokemon's value
                    db.get(`SELECT * FROM most_favorited WHERE id=${id}`, (err, result) => {
                        //Error handling
                        if(err){
                            console.error("Error getting most_favorited pokemon: ");
                            console.error(err);
                            //Return false as response
                            res.json(false);
                        }else{
                            //Check if Pokemon has an entry in the most_favorited table
                            if(result){
                                //If Pokemon has entry, increment or decrement favorites count
                                let add = 1;
                                if(!favorite){
                                    add = -1;
                                }
                                const favorites = result.favorites + add;
                                //Update Pokemon's entry in the DB
                                db.run(`UPDATE most_favorited SET favorites=${favorites} WHERE id=${id}`, err => {
                                    //Handle error
                                    if(err){
                                        console.error("Error updating most_favorited DB: ");
                                        console.error(err);
                                        //Return false as response
                                        res.json(false);
                                    }
                                    else{
                                        //Return true as response
                                        res.json(true);
                                    }
                                });
                            }else{
                                //If Pokemon doesn't have an entry, insert a new entry in the most_favorited table for that Pokemon
                                //and set the favorites count to 1
                                db.run(`INSERT INTO most_favorited (id, favorites) VALUES (${id}, 1)`, err => {
                                    //Handle error
                                    if(err){
                                        console.error("Error inserting into most_favorited DB: ");
                                        console.error(err);
                                        //Return false as response
                                        res.json(false);
                                    }
                                    else{
                                        //Return true as response
                                        res.json(true);
                                    }
                                })
                            }
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