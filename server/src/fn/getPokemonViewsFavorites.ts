//server/src/fn/getPokemonViewsFavorites.ts

import { Database } from "sqlite3";

//Retrive views count and favorites count for a Pokemon by id
export default function getPokemonViewsFavorites(db: Database, id: number){

    return new Promise((resolve, reject) => {

        //Initially favorites and views will be 0
        let favorites = 0;
        let views = 0;

        //Get Pokemon's favorite count from DB
        db.get(`SELECT * FROM most_favorited WHERE id=${id}`, (err, fav_row) => {
            //Handle error
            if(err){
                //Reject with error
                reject(err);
            }else{
                //If Pokemon has an entry in the DB, set the favorites count to that entry's value
                if(fav_row){
                    favorites = fav_row.favorites;
                }

                //Get Pokemon's views count from DB
                db.get(`SELECT * FROM most_viewed WHERE id=${id}`, (err, viewed_row) => {
                    //Handle error
                    if(err){
                        //Reject with error
                        reject(err);
                    }else{
                        //If Pokemon has an entry in the DB, set the views count to that entry's value
                        if(viewed_row){
                            views = viewed_row.views;
                        }

                        //Resolve and return Pokemon's views and favorites count
                        resolve({views: views, favorites: favorites});
                    }
                });
            }
        })
    })
}