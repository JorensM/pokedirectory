//server/src/endpoints/index.ts

//Types
import { Application } from "express";
import { Database } from "sqlite3";

//Endpoints
import loginUser from "./loginUser";
import registerUser from "./registerUser";
import getUser from "./getUser";
import logoutUser from "./logoutUser";
import getPokemon from "./getPokemon";
import getMostFavorited from "./getMostFavorited";
import getMostViewed from "./getMostViewed";
import incrementViews from "./incerementViews";
import setFavorite from "./setFavorite";

//Initialize endpoints
export default function initEndpoints(app: Application, db: Database){
    registerUser(app, db);
    loginUser(app, db);
    getUser(app, db);
    logoutUser(app);
    getPokemon(app, db);
    getMostFavorited(app, db);
    getMostViewed(app, db);
    incrementViews(app, db);
    setFavorite(app, db);
}