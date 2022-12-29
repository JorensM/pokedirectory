//client/src/components/Header/Header.tsx

//Core
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

//Style
import "./Header.css";

//Functions
import getUser from "../../fn/getUser";
import NavOption from "../NavOption/NavOption";

//Types
import User from "../../types/User";

export default function Header(){

    const [user, setUser] = useState<User | null>(null);
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
        navigate("/search", {state: {term: searchTerm}});
        window.location.reload();
    }

    const handleSearchTerm = (e: React.FormEvent<HTMLInputElement>) => {
        setSearchTerm(e.currentTarget.value);
    }

    return (
        <div className="Header">
            <div className="HeaderLeft">
                <Link to="/">PokeDirectory</Link>
                <form onSubmit={handleSearch} key="form">
                    <input type="text" placeholder="Search" onChange={handleSearchTerm}></input>
                </form>
                
            </div>
            <div className="HeaderRight">
                {user ? 
                    [  
                        <span key="aaa">Welcome back, {user.username}</span>,
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