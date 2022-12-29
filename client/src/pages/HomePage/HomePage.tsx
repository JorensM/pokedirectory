//client/src/pages/HomePage/HomePage.tsx

//Components
import Page from "../../components/Page/Page";

export default function HomePage(){

    return (
        <Page>
            <div className="HomePage">
                <div className="Column">
                    <h2>Most viewed</h2>
                </div>
                <div className="Column">
                    <h2>Most favorited</h2>
                </div>
            </div>
        </Page>
    )
}