//server/src/endpoints/index.ts

//Types
import { Application } from "express";

//Endpoints
import loginUser from "./loginUser";
import registerUser from "./registerUser";

export default function initEndpoints(app: Application){
    loginUser(app);
    registerUser(app);
}