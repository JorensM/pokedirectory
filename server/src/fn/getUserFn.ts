//server/src/fn/getUserFn.ts

//Types
import { rejects } from "assert";
import { Database } from "sqlite3";
import User from "types/User";

//Functions
import { queryDB } from "./db";

export default function getUserFn(username: string | null = null, db: Database){
    return new Promise((resolve, reject) => {
        if(username !== null){
            db.all(`SELECT * FROM users WHERE username=${username}`, (err, result) => {
                if(err){
                    reject(err);
                }
                else{
                    if(result.length > 0){
                        const favorites = result[0].favorites.split(",");

                        const user: User = {
                            username: username,
                            favorites: favorites
                        }

                        resolve(user);
                    }
                    else{
                        resolve(null);
                    }
                }
            })
        }else{
            
        }
    })
    
}