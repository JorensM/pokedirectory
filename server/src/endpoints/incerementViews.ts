//server/src/endpoints/incrementViews.ts

//Types
import { Application, Request, Response } from "express";
import { Database } from "sqlite3";

//Endpoint to increment a Pokemon's views count
export default function incrementViews(app: Application, db :Database){

    //Create endpoint
    app.post("/incrementViews", (req: Request, res: Response):void => {

        //Number of Pokemon to return
        const id = req.body.id;

        //Get Pokemon from most_viewed table
        db.get(`SELECT * FROM most_viewed WHERE id=${id}`, (err, result) => {
            //Error handling
            if(err){
                console.error("Error incrementing Pokemon's views count: ");
                console.error(err);
                //Return false as response
                res.json(false);
            }else{
                //Check if Pokemon has an entry in the most_viewed table
                if(result){
                    //If Pokemon has entry, increment its views count in the DB by 1
                    const views = result.views + 1;
                    //Update Pokemon's entry in the DB
                    db.run(`UPDATE most_viewed SET views=${views} WHERE id=${id}`, err => {
                        //Handle error
                        if(err){
                            console.error("Error updating most_viewed DB: ");
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
                    //If Pokemon doesn't have an entry, insert a new entry in the most_viewed table for that Pokemon
                    //and set the views count to 1
                    db.run(`INSERT INTO most_viewed (id, views) VALUES (${id}, 1)`, err => {
                        //Handle error
                        if(err){
                            console.error("Error inserting into most_viewed DB: ");
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
    });
}