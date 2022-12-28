//client/src/components/Page/Page.tsx

//Style
import { resolveSoa } from "dns";
import { useState } from "react";
import "./UserForm.css";

//Props type
type UserFormProps = {
    isLogin: boolean
}

export default function UserForm(props: UserFormProps){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

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
                    setErrorMessage("Registered!");
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
            
        }
    }

    return (
        <form>
            <div className="UserForm">
                <input type="text" value={username} onChange={handleUsername} placeholder="Username"/>
                <br/>
                <input type="password" value={password} onChange={handlePassword} placeholder="Password" />
                <br/>
                <span className="Error">{errorMessage}</span>
                <button type="button" onClick={handleSubmit}>{props.isLogin ? "Login" : "Register" }</button>
            </div>
            
        </form>
    )
}