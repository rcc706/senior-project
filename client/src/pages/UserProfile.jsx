import prof from "../styles/main.module.css";
import { useState} from "react";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";
import useSessionData from "../components/useSessionData";

// this is the url for the server from the .env file
const serverURL = import.meta.env.VITE_SERVER_URL;

export default function UserProfile() {

    // States from the useSessionData - getting the username and email from the session to use here
    const {username, email} = useSessionData();
    const [loggedOut, setLoggedOut] = useState(false);

    // Handles logging out the user by sending a post request to the /logout route on the server 
    // there the session is cleared. 
    const handleLogout = async () => {
        const response = await axios.post(`${serverURL}/logout`, {}, {withCredentials: true});
        if (response.status === 200) {
            // status is good, update loggedOut state to navigate 
            setLoggedOut(true);
        } 
    };

    return (
        <>
            {/* Navbar to go to the other pages.  */}
            <header>
                <Link to="/home" style={{fontSize: "30px", color: "#d4af37"}}>GH</Link>
                <nav>
                    <ul className={prof.nav__links}>
                        <li><Link to="/party">PARTY</Link></li>
                        <li><Link to="/game">GAME</Link></li>
                    </ul>
                </nav>
                <button className={prof.logoutButton} onClick={handleLogout}>LOGOUT</button>
            </header>

            {/* Container that includes displays the username in as a 1-header, and the email in the subcontainer */}
            <div className={prof.container} style={{maxWidth: "80%"}}>
                <nav>
                    <ul className={prof.nav__links}>
                        <li><h1>{username?.username}</h1></li>
                    </ul>
                </nav>
                    <br />
                    <hr style={{color: "#d4af37"}} />
                    <div className={prof.subcontainer}>
                        <p style={{fontSize: '22px'}}>Welcome to your profile page!</p>

                        <p>Currently Registered Email: {email?.email}</p>

                    </div>
            </div>

            {/* If handleLogout updated the loggedOut state to true, then navigate to the landing page after clearing session */}
            {loggedOut && <Navigate to="/" replace />}
        </>
    );
}