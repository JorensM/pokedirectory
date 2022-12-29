//client/src/pages/SearchPage/SearchPage.tsx

//Core
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

//Components
import Page from "../../components/Page/Page";
import PokemonList from "../../components/PokemonList/PokemonList";
import Pokemon from "../../types/Pokemon";

//Style
import "./SearchPage.css";

export default function SearchPage () {

    const location = useLocation();
    const term = location.state.term;

    const [pokemon, setPokemon] = useState<Array<Pokemon>>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch(`getPokemon?term=${term}`)
        .then(res => res.json())
        .then(data => {
            if(data){
                
                (async () =>{
                    let newPokemon: Array<Pokemon> = [];
                    for(const entry of data){
                        const id = entry.url.slice(0, -1).split("/").pop();
                        const response = await fetch(`getPokemon?id=${id}`);
                        newPokemon.push(await response.json());
                    }
                    setPokemon(newPokemon);
                    setIsLoading(false);
                })();
            }
        })
        .catch(err => {
            console.error("Error calling getPokemon endpoint: ");
            console.error(err);
        })
    }, []);

    return (
        <Page>
            <div className="SearchPage">
                <h1>Search results for: {term}</h1>
                <br/>
                <br/>
                <br/>
                {isLoading && <h3>Loading...</h3>}
                <PokemonList pokemon={pokemon} />
            </div>
        </Page>
    )
}