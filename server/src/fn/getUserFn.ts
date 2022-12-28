//server/src/fn/getUserFn.ts

//Types
import { Database } from "sqlite3";
import User from "../types/User";

//Get user from Database by username
export default function getUserFn( db: Database, username: string | null = null){
    return new Promise<User|null>((resolve, reject) => {
        //Check if username is defined
        if(username !== null){
            
            //Select user by username from DB
            db.all(`SELECT * FROM users WHERE username="${username}"`, (err, result) => {
                //Error handling
                if(err){
                    reject(err);
                }
                else{
                    //Check if DB result array has any results
                    if(result.length > 0){

                        //Get favorites from the result
                        const favorites = result[0].favorites.split(",");

                        //Create User object from the DB data
                        const user: User = {
                            username: username,
                            favorites: favorites
                        }

                        //Resolve the promise and return the user
                        resolve(user);
                    }
                    else{
                        //Resolve the promise and return null if DB result array was empty
                        resolve(null);
                    }
                }
            })
        }
    })
}