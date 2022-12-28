//client/src/components/Page/Page.tsx

//Style
import { resolveSoa } from "dns";
import { useEffect, useState } from "react";
import getUser from "../../fn/getUser";
import "./UserForm.css";

//Props type
type UserFormProps = {
    isLogin: boolean
}

export default function UserForm(props: UserFormProps){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
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

    const handlePassword = (e: React.FormEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value);
    }

    const handleUsername = (e: React.FormEvent<HTMLInputElement>) => {
        setUsername(e.currentTarget.value);
    }

    const handleSubmit = () => {
        if(!props.isLogin){
            fetch("registerUser", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            .then(res => res.json())
            .then(data => {
                if(data === true){
                    //setErrorMessage("Registered!");
                }
                else{
                    setErrorMessage("Error");
                }
            })
            .catch(err => {
                console.error("Error calling the registerUser endpoint: ");
                console.error(err);
                setErrorMessage("Error calling endpoint");
            })
        }
        else{
            fetch("loginUser", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            .then(res => res.json())
            .then(data => {
                if(data === true){
                    setErrorMessage("logged in!");
                }
                else{
                    setErrorMessage("Error");
                }
            })
            .catch(err => {
                console.error("Error calling the registerUser endpoint: ");
                console.error(err);
                setErrorMessage("Error calling endpoint");
            })
        }
    }

    return (
        <form>
            {!user ? 
            <div className="UserForm">
                <input type="text" value={username} onChange={handleUsername} placeholder="Username"/>
                <br/>
                <input type="password" value={password} onChange={handlePassword} placeholder="Password" />
                <br/>
                <span className="Error">{errorMessage}</span>
                <button type="button" onClick={handleSubmit}>{props.isLogin ? "Login" : "Register" }</button>
            </div>
            :
            <h2>You are logged in!</h2>
            }
            
        </form>
    )
}