//server/src/endpoints/getPokemon.ts

//Core
import axios from "axios";

//Types
import { Application, Request, Response } from "express";

import { Database } from "sqlite3";

//Functions
import pokemonToObj from "../fn/pokemonToObj";


export default function getPokemon(app: Application, db :Database){
    app.get("/getPokemon", (req: Request, res: Response):void => {

        let id = req.query.id;
        let term = req.query.term;

        //Check if searched by id or by term
        if(id){
            axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(response => {
                const data = response.data;
                //console.log(response);

                pokemonToObj(db, data)
                .then(pokemon => {
                    res.json(pokemon);
                })
                .catch(err => {
                    console.error("Error converting pokemon to obj: ");
                    console.error(err);
                    res.json(false);
                })

                //res.json(response.data);
            })
            .catch(err => {
                console.error("Error retrieving Pokemon by id: ");
                console.error(err);
                res.json(false);
            });
        }
        else if(term){
            axios.get("https://pokeapi.co/api/v2/pokemon?limit=-1")
            .then(response => {
                const data = response.data.results;

                let filtered = data.filter((entry: any) => {
                    return entry.name.includes(term);
                })

                filtered = filtered.slice(0, 20);

                res.json(filtered);
            })
            .catch(err => {
                console.error("Error searching pokemon by term: ");
                console.error(err);
                res.json(false);
            });
        }

    });
}