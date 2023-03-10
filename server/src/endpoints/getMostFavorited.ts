//server/src/endpoints/getMostFavorited.ts

//Types
import { Application, Request, Response } from "express";
import { Database } from "sqlite3";

//Endpoint to return top favorited Pokemon
export default function getMostFavorited(app: Application, db :Database){

    //Create endpoint
    app.get("/getMostFavorited", (req: Request, res: Response):void => {

        //Number of Pokemon to return
        const count = req.query.count;

        //Get most favorited Pokemon from the DB
        db.all("SELECT * FROM most_favorited ORDER BY favorites DESC", (err, result) => {
            //Handle error
            if(err){
                console.error("Error getting most favorited Pokemon: ");
                console.error(err);
                //Return false as response
                res.json(false);
            }else{
                if(typeof count === "string"){
                    //Limit results to "count" amount of Pokemon
                    result = result.slice(0, parseInt(count));

                    //Return results as response
                    res.json(result);
                }
            }
        })
    });
}