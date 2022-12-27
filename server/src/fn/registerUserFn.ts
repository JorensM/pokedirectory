//server/src/fn/registerUserFn.ts

import { Database } from "sqlite3";

export default function registerUserFn(db: Database, username: string, password: string){
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO users (username, password, favorites) VALUES ("${username}", "${password}", "")`, (err) => {
            if(err){
                reject(err);
            }else{
                resolve(true);
            }
        });
    })
}