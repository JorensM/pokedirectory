//server/src/fn/validateUser.ts

//Types
import { Database } from "sqlite3";

export default function validateUser(db: Database, username: string, password: string){
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM users WHERE username="${username}" AND password="${password}"`, (err, result) => {
            if(err){
                reject(err);
            }else{
                if(result.length > 0){
                    resolve(true);
                }else{
                    resolve(false);
                }
            }
        })
    })
}