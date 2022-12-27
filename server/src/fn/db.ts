//server/src/fn/db.ts

import { Database } from "sqlite3";

export function query(db: Database, sql: string){
    return new Promise((resolve, reject) => {
        db.all(sql, (err, result) => {
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        })
    })
}