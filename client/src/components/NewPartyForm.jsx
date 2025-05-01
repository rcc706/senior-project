import { useState } from "react";
import home from "../styles/main.module.css";

// serverURL environment variable from the .env file to reduce hardcoding links everywhere
const serverURL = import.meta.env.VITE_SERVER_URL;

export default function NewPartyForm() {

    // state for the party name
    const [pName, setPName] = useState();

    return (
        <>
            <h1 style={{textAlign: "center"}}>Create New Party</h1>
            <h2 style={{fontSize: "22px"}}>Enter Party Name Below</h2>

            {/* Form to create a new party */}
            <form>
                <input type="text" name="partyname" placeholder="Enter Party Name" value={pName} required/>
                <button type="submit" className={home.signlogButton}  style={{width: "35%"}}>CREATE PARTY</button>
            </form>
        </>
    )
}