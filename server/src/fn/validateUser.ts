//server/src/fn/validateUser.ts

//Types
import { Database } from "sqlite3";

//Validate user credentials
export default function validateUser(db: Database, username: string, password: string){
    return new Promise((resolve, reject) => {
        //Retrieve user from DB based on username and password
        db.all(`SELECT * FROM users WHERE username="${username}" AND password="${password}"`, (err, result) => {
            //Handle errors
            if(err){
                //Reject with error
                reject(err);
            }else{
                //If there are any results returned from the DB, that means that the username and password combo is valid.
                if(result.length > 0){
                    //Resolve with true if valid
                    resolve(true);
                }else{
                    //Resolve with false if invalid
                    resolve(false);
                }
            }
        })
    })
}