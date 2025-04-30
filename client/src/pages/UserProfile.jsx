import prof from "../styles/main.module.css";
import { useState} from "react";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";
import useSessionData from "../components/useSessionData";
const serverURL = import.meta.env.VITE_SERVER_URL;

export default function UserProfile() {

    const {username, email} = useSessionData();

    const [loggedOut, setLoggedOut] = useState(false);

    const handleLogout = async () => {
        const response = await axios.post(`${serverURL}/logout`, {}, {withCredentials: true});
        if (response.status === 200) {
            setLoggedOut(true);
        } 
    };

    return (
        <>
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

            {loggedOut && <Navigate to="/" replace />}
        </>
    );
}