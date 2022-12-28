//client/src/pages/PokemonPage/PokemonPage.tsx

//Core
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

//Components
import Page from "../../components/Page/Page";
import Pokemon from "../../types/Pokemon";

//Style
import "./PokemonPage.css";

export default function PokemonPage () {

    const location = useLocation();

    const [pokemon, setPokemon] = useState<Pokemon | null>(null);

    useEffect(() => {
        const id = location.state.id;
        fetch(`getPokemon?id=${id}`)
        .then(res => res.json())
        .then(data => {
            setPokemon(data);
        })
        .catch(err => {
            console.error("Error calling the getPokemon endpoint: ");
            console.error(err);
        })
    }, []);

    return(
        <Page>
            <div className="PokemonPage">
                {pokemon ? 
                    [
                        <div className="Row1">
                            <h2>{pokemon.name}</h2>
                            <img src={pokemon.img} className="PokemonImg"/>
                        </div>,
                        <div className="Row2">
                            <h2>Stats</h2>
                            <h4>HP: {pokemon.stats.hp}</h4>
                            <h4>ATTACK: {pokemon.stats.attack}</h4>
                            <h4>DEFENSE: {pokemon.stats.defense}</h4>
                            <h4>SP.ATK: {pokemon.stats.sp_atk}</h4>
                            <h4>SP.DEF: {pokemon.stats.sp_def}</h4>
                            <h4>SPEED: {pokemon.stats.speed}</h4>
                        </div>,
                        <div className="Row2">
                            <h2>Types</h2>
                            {pokemon.types.map(type => {
                                return <h4>{type}</h4>
                            })}
                        </div>,
                        <div className="Row2">
                            <h2>Abilities</h2>
                            {pokemon.abilities.map(ability => {
                                return <h4>{ability}</h4>
                            })}
                        </div>
                    ]
                : ""}
            </div>
        </Page>
    )
}