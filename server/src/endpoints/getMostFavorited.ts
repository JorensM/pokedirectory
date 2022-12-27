//server/src/endpoints/getMostFavorited.ts

//Types
import { Application, Request, Response } from "express";
import { Database } from "sqlite3";

export default function getMostFavorited(app: Application, db :Database){

    

    app.get("/getMostFavorited", (req: Request, res: Response):void => {

        const count = req.query.count;

        db.all("SELECT * FROM most_favorited ORDER BY favorites DESC", (err, result) => {
            if(err){
                console.error("Error getting most favorited Pokemon: ");
                console.error(err);
                res.json(false);
            }else{
                if(typeof count === "string"){
                    result = result.slice(0, parseInt(count));
                    res.json(result);
                }
            }
        })
    });
}