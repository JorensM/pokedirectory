//client/src/components/Header/Header.tsx

//Core
import { useState, useEffect } from "react";

//Style
import "./Header.css";

//Functions
import getUser from "../../fn/getUser";

export default function Header(){

    const [user, setUser] = useState(null);

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

    return (
        <div className="Header">
            <div className="HeaderLeft">
                PokeDirectory
            </div>
            <div className="HeaderRight">
                Nav
            </div>
        </div>
    )
}