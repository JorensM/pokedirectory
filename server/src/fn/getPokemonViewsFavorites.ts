import { Database } from "sqlite3";

export default function getPokemonViewsFavorites(db: Database, id: number){

    return new Promise((resolve, reject) => {
        let favorites = 0;
        let views = 0;

        db.get(`SELECT * FROM most_favorited WHERE id=${id}`, (err, fav_row) => {
            if(err){
                reject(err);
            }else{
                if(fav_row){
                    favorites = fav_row.favorites;
                }

                db.get(`SELECT * FROM most_viewed WHERE id=${id}`, (err, viewed_row) => {
                    if(err){
                        reject(err);
                    }else{
                        if(viewed_row){
                            views = viewed_row.views;
                        }
                        resolve({views: views, favorites: favorites});
                    }
                });
            }
        })
    })
}