//client/src/components/Header/Header.tsx

//Core
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

//Style
import "./Header.css";

//Functions
import getUser from "../../fn/getUser";
import NavOption from "../NavOption/NavOption";

export default function Header(){

    const [user, setUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        getUser()
        .then((user: any) => {
            setUser(user);
        })
        .catch(err => {
            console.error("Error getting user: ");
            console.error(err);
        });
    })

    const handleFavorites = () => {
        navigate("/favorites");
    }

    const handleLogin = () => {
        navigate("/login");
    }

    const handleRegister = () => {
        navigate("/register");
    }

    const handleLogout = () => {
        fetch("logoutUser")
        .then(data => {
            navigate("/login");
        })
        .catch(err => {
            console.error("Error logging out: ");
            console.error(err);
        })
    }

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(location.pathname);
        navigate("/search", {state: {term: searchTerm}})
    }

    const handleSearchTerm = (e: React.FormEvent<HTMLInputElement>) => {
        setSearchTerm(e.currentTarget.value);
    }

    return (
        <div className="Header">
            <div className="HeaderLeft">
                PokeDirectory
                <form onSubmit={handleSearch}>
                    <input type="text" placeholder="Search" onChange={handleSearchTerm}></input>
                </form>
                
            </div>
            <div className="HeaderRight">
                {user ? 
                    [  
                        <NavOption color="black" label="Favorites" onClick={handleFavorites} key="1"/>,
                        <NavOption color="red" label="Log out" onClick={handleLogout} key="2"/>
                    ]
                :
                    [
                        <NavOption color="blue" label="Register" onClick={handleRegister} key="3"/>,
                        <NavOption color="green" label="Log in" onClick={handleLogin} key="4"/>
                    ]
                }
            </div>
        </div>
    )
}