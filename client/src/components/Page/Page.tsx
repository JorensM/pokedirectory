//client/src/components/Page/Page.tsx

//Style
import "./Page.css";

//Components
import Header from "../Header/Header";

//Props type
type PageProps = {
    children: JSX.Element | string
}

export default function Page(props: PageProps){

    return (
        <div className="Page">
            <div className="PageTop">
                <Header />
            </div>
            <div className="PageContent">
                {props.children}
            </div>
        </div>
    )
}