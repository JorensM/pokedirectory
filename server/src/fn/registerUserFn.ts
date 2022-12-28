//server/src/fn/registerUserFn.ts

//Types
import { Database } from "sqlite3";

//Registers a new user in the DB
export default function registerUserFn(db: Database, username: string, password: string){
    return new Promise((resolve, reject) => {
        //Insert new user into the database
        db.run(`INSERT INTO users (username, password, favorites) VALUES ("${username}", "${password}", "")`, (err) => {
            //Handle error
            if(err){
                //Reject with error
                reject(err);
            }else{
                //Resolve with true if user was successfully added to the DB
                resolve(true);
            }
        });
    })
}