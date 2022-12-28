//server/src/fn/pokemonToObj.ts

//Types
import Stats from "../types/Stats";
import Pokemon from "../types/Pokemon";
import { Database } from "sqlite3";
import getPokemonViewsFavorites from "./getPokemonViewsFavorites";

//Convert PokeAPI data to Pokemon object
export default function pokemonToObj(db: Database, data: any){
    const stats: Stats = {
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        sp_atk: data.stats[3].base_stat,
        sp_def: data.stats[4].base_stat,
        speed: data.stats[5].base_stat,
    }

    let abilities: Array<string> = [];
    let types: Array<string> = [];

    data.abilities.forEach((e: any) => {
        abilities.push(e.ability.name);
    })

    data.types.forEach((e: any) => {
        types.push(e.type.name)
    })

    return new Promise((resolve, reject) => {
        getPokemonViewsFavorites(db, data.id)
        .then((result: any) => {
            const pokemon:Pokemon = {
                id: data.id,
                name: data.name,
                stats: stats,
                abilities: abilities,
                types: types,
                views: result.views,
                favorites: result.favorites
            }

            resolve(pokemon);
        })
        .catch(err => {
            reject(err);
        })
    })
}