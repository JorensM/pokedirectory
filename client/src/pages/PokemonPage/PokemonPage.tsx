//client/src/pages/PokemonPage/PokemonPage.tsx

//Core
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

//Components
import Page from "../../components/Page/Page";

//Types
import Pokemon from "../../types/Pokemon";
import User from "../../types/User";

//Style
import "./PokemonPage.css";

export default function PokemonPage () {

    const location = useLocation();

    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isFavorited, setIsFavorited] = useState<boolean>(false);

    useEffect(() => {
        const id = location.state.id;
        fetch(`getPokemon?id=${id}`)
        .then(res => res.json())
        .then(data => {
            setPokemon(data);

            fetch("getUser")
            .then(res => res.json())
            .then(userData => {
                setUser(userData);
                if(userData){
                    if(userData.favorites.includes(data.id.toString())){
                        setIsFavorited(true);
                    }else{
                        setIsFavorited(false);
                    }
                }
                
            })
            .catch(err => {
                console.error("Error calling the getUser endpoint: ");
                console.error(err);
            })
        })
        .catch(err => {
            console.error("Error calling the getPokemon endpoint: ");
            console.error(err);
        })
    }, []);

    const toggleFavorite = () => {

        //Whether Pokemon is to be favorited to unfavorited.
        //If true, Pokemon will be favorited, if false, Pokemon will be unfavorited.
        const toFavorite = !isFavorited;

        //Call the setFavorite endpoint
        fetch("setFavorite", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: pokemon?.id,
                favorite: toFavorite
            })
        })
        .then(res => res.json())
        .then(data => {
            fetch("getUser")
            .then(res => res.json())
            .then(userData => {
                if(userData.favorites.includes(pokemon!.id.toString())){
                    setIsFavorited(true);
                }else{
                    setIsFavorited(false);
                }
            })
            .catch(err => {
                console.error("Error calling the getUser endpoint: ");
                console.error(err);
            })
        })
        //Error handling
        .catch(err => {
            console.error("Error calling the setFavorite endpoint: ");
            console.error(err);
        })

    }

    return(
        <Page>
            <div className="PokemonPage">
                {pokemon ? 
                    [
                        <div className="Row1" key="row1">
                            <h2>{pokemon.name}</h2>
                            <img src={pokemon.img} className="PokemonImg"/>
                            <br/>
                            <br/>
                            <br/>
                            {user &&
                                <div className="FavoriteButton" onClick={toggleFavorite}>
                                    {isFavorited ? "Unfavorite" : "Favorite"}
                                </div>
                            }
                        </div>,
                        <div className="Row2" key="row2">
                            <h2>Stats</h2>
                            <h4>HP: {pokemon.stats.hp}</h4>
                            <h4>ATTACK: {pokemon.stats.attack}</h4>
                            <h4>DEFENSE: {pokemon.stats.defense}</h4>
                            <h4>SP.ATK: {pokemon.stats.sp_atk}</h4>
                            <h4>SP.DEF: {pokemon.stats.sp_def}</h4>
                            <h4>SPEED: {pokemon.stats.speed}</h4>
                        </div>,
                        <div className="Row2" key="row3">
                            <h2>Types</h2>
                            {pokemon.types.map(type => {
                                return <h4 key={type}>{type}</h4>
                            })}
                        </div>,
                        <div className="Row2" key="row4">
                            <h2>Abilities</h2>
                            {pokemon.abilities.map(ability => {
                                return <h4 key={ability}>{ability}</h4>
                            })}
                        </div>
                    ]
                : ""}
            </div>
        </Page>
    )
}