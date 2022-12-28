//server/src/endpoints/getPokemon.ts

//Core
import axios from "axios";

//Types
import { Application, Request, Response } from "express";
import { Database } from "sqlite3";

//Functions
import pokemonToObj from "../fn/pokemonToObj";

//Endpoint to retrive Pokemon by id or search term
export default function getPokemon(app: Application, db :Database){
    app.get("/getPokemon", (req: Request, res: Response):void => {

        //GET parameters
        let id = req.query.id;
        let term = req.query.term;

        //Check if searched by id or by term
        if(id){
            //If searched by id, send GET request to PokeAPI with the passed id
            axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(response => {
                const data = response.data;
                
                //Convert PokeAPI data to Pokemon object
                pokemonToObj(db, data)
                .then(pokemon => {

                    //Return pokemon as response
                    res.json(pokemon);
                })
                //Handle error
                .catch(err => {
                    console.error("Error converting pokemon to obj: ");
                    console.error(err);
                    //Return false as response
                    res.json(false);
                })

            })
            //Handle error
            .catch(err => {
                console.error("Error retrieving Pokemon by id: ");
                console.error(err);
                //Return false as response
                res.json(false);
            });
        }
        else if(term){
            //If searched by term, get all the Pokemon from the PokeAPI
            //and filter them by search term
            axios.get("https://pokeapi.co/api/v2/pokemon?limit=-1")
            .then(response => {
                const data = response.data.results;

                //Filter all Pokemon by search term
                let filtered = data.filter((entry: any) => {
                    return entry.name.includes(term);
                })

                //Limit filtered results to 20 entries
                filtered = filtered.slice(0, 20);

                //Return filtered Pokemon as response
                res.json(filtered);
            })
            //Handle error
            .catch(err => {
                console.error("Error searching pokemon by term: ");
                console.error(err);
                //Return false as response
                res.json(false);
            });
        }

    });
}