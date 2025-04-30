import home from "../styles/main.module.css";
import {Link} from "react-router-dom";

export default function NoPage() {

    return (
        <>
            <div className={home.container}>
                <h1 style={{textAlign: "center"}}>Oops! Page Does Not Exist!</h1>
                <h2 style={{textAlign: "center"}}>Go Back to the Landing Page</h2>
                <div className={home.subcontainer}>
                    <Link to="/">
                        <button className={home.signlogButton} style={{width: "40%", marginTop: "0%"}}>Landing Page</button>
                    </Link>
                </div>
            </div>
        </>
    );
}
