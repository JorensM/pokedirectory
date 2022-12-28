//client/src/components/PokemonList/PokemonList.tsx

//Core
import { useNavigate } from "react-router-dom";

//Style
import "./PokemonList.css";

//Types
import Pokemon from "../../types/Pokemon";

//Props type
type PokemonListProps = {
    pokemon: Array<Pokemon>
}

export default function PokemonList (props: PokemonListProps){

    const navigate = useNavigate();

    const gotoPokemon = (id: number) => {
        navigate("/pokemon?", {state: {id: id}});
    }

    return (
        <div className="PokemonList">
            {props.pokemon.map((entry: Pokemon) => {
                return (
                    <div className="PokemonListItem" key={entry.id} onClick={() => gotoPokemon(entry.id)}>
                        <img src={entry.img} className="PokemonListImg"/>
                        <span>{entry.name}</span>
                    </div>
                )
            })}
        </div>
    )
}