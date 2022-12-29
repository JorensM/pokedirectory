//client/src/pages/FavoritesPage/FavoritesPage.tsx

//Core
import { useEffect, useState } from "react";

//Style
import "./FavoritesPage.css";

//Components
import Page from "../../components/Page/Page";
import PokemonList from "../../components/PokemonList/PokemonList";

//Types
import Pokemon from "../../types/Pokemon";
import User from "../../types/User";


export default function FavoritesPage () {

    const [pokemon, setPokemon] = useState<Array<Pokemon>>([]);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        fetch("getUser")
        .then(res => res.json())
        .then(userData => {
            if(userData){
                const favorites = userData.favorites;
                (async () => {
                    let newPokemon = [];
                    for(const id of favorites){
                        const response = await fetch(`getPokemon?id=${id}`);
                        newPokemon.push(await response.json());
                    }
                    setPokemon(newPokemon);
                })()
            }
        })
        //Handle errors
        .catch(err => {
            console.error("Error calling getUser endpoint: ");
            console.error(err);
        })
    }, [])

    return (
        <Page>
            <div className="FavoritesPage">
                <h1>Favorites</h1>
                <br/>
                <br/>
                <br/>
                <PokemonList pokemon={pokemon} />
            </div>
        </Page>
    )
}