//client/src/pages/RegisterPage/RegisterPage.tsx

//Style
import "./RegisterPage.css";

//Components
import Page from "../../components/Page/Page";
import UserForm from "../../components/UserForm/UserForm";

export default function RegisterPage(){

    return(
        <Page>
            <div className="RegisterPage">
                <h1>Register</h1>
                <br/>
                <br/>
                <br/>
                <UserForm isLogin={false} />
            </div>
        </Page>
    )
}