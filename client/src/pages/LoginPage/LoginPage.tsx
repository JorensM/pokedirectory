//client/src/pages/LoginPage/LoginPage.tsx

//Style
import "./LoginPage.css";

//Components
import Page from "../../components/Page/Page";
import UserForm from "../../components/UserForm/UserForm";

export default function LoginPage () {
    return (
        <Page>
            <div className="LoginPage">
                <h1>Login</h1>
                <br/>
                <br/>
                <br/>
                <UserForm isLogin={true} />
            </div>
        </Page>
    )
}