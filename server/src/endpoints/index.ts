//server/src/endpoints/index.ts

//Types
import { Application } from "express";
import { Database } from "sqlite3";

//Endpoints
import loginUser from "./loginUser";
import registerUser from "./registerUser";

export default function initEndpoints(app: Application, db: Database){
    loginUser(app);
    registerUser(app, db);
}