//client/src/pages/HomePage/HomePage.tsx

//Core
import { useEffect, useState } from "react";

//Style
import "./HomePage.css";

//Components
import Page from "../../components/Page/Page";
import PokemonList from "../../components/PokemonList/PokemonList";

//Types
import Pokemon from "../../types/Pokemon";


export default function HomePage(){

    //State
    const [mostViewed, setMostViewed] = useState<Array<Pokemon>>([]);
    const [mostFavorited, setMostFavorited] = useState<Array<Pokemon>>([]);
    const [viewedLoading, setViewedLoading] = useState<boolean>(false);
    const [favsLoading, setFavsLoading] = useState<boolean>(false);


    //On page render
    useEffect(() => {

        setViewedLoading(true);
        setFavsLoading(true);

        //Call getMostViewed endpoint
        fetch("getMostViewed?count=5")
        .then(res => res.json())
        .then(data => {
            (async () => {
                let newPokemon = [];
                for(const entry of data){
                    const response = await fetch(`getPokemon?id=${entry.id}`);
                    newPokemon.push(await response.json());
                }
                setMostViewed(newPokemon);
                setViewedLoading(false);
            })()
        })
        //Handle errors
        .catch(err => {
            console.error("Error calling getMostViewed endpoint: ");
            console.error(err);
        })

        //Call getMostFavorited endpoint
        fetch("getMostFavorited?count=5")
        .then(res => res.json())
        .then(data => {
            (async () => {
                let newPokemon = [];
                for(const entry of data){
                    const response = await fetch(`getPokemon?id=${entry.id}`);
                    newPokemon.push(await response.json());
                }
                setMostFavorited(newPokemon);
                setFavsLoading(false);
            })()
        })
        //Handle errors
        .catch(err => {
            console.error("Error calling getMostViewed endpoint: ");
            console.error(err);
        })
    }, [])

    return (
        <Page>
            <div className="HomePage">
                <div className="Column">
                    <h2>Most viewed</h2>
                    <br/>
                    {viewedLoading && <h3>Loading...</h3>}
                    <PokemonList pokemon={mostViewed} />
                </div>
                <div className="Column">
                    <h2>Most favorited</h2>
                    <br/>
                    {favsLoading && <h3>Loading...</h3>}
                    <PokemonList pokemon={mostFavorited} />
                </div>
            </div>
        </Page>
    )
}