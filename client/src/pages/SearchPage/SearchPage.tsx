//client/src/pages/SearchPage/SearchPage.tsx

//Core
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

//Components
import Page from "../../components/Page/Page";
import PokemonList from "../../components/PokemonList/PokemonList";

//Style
import "./SearchPage.css";

export default function SearchPage () {

    const location = useLocation();
    const term = location.state.term;

    const [pokemon, setPokemon] = useState([]);

    useEffect(() => {
        fetch(`getPokemon?term=${term}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data){
                let newPokemon
                (async () =>{
                    data.forEach(async (entry: any) => {
                        const id = entry.url.slice(0, -1).split("/").pop();
                        console.log(id);
                        const response = await fetch(`getPokemon?id=${id}`);
                        console.log(await response.json());
                    })
                })();
            }
        })
        .catch(err => {
            console.error("Error calling getPokemon endpoint: ");
            console.error(err);
        })
    });

    return (
        <Page>
            <div className="SearchPage">
                <h1>Search results for: {term}</h1>
                <br/>
                <br/>
                <br/>
                <PokemonList />
            </div>
        </Page>
    )
}