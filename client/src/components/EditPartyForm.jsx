import { useState } from "react";
import home from "../styles/main.module.css";

// server url from .env file for less hardcoding of links everywhere
const serverURL = import.meta.env.VITE_SERVER_URL;


export default function EditPartyForm() {

    // state for the name of the party to be edited
    const [pName, setPName] = useState();

    return (
        <>
            <h1 style={{textAlign: "center"}}>Edit Current Party</h1>
            <h2 style={{fontSize: "22px"}}>Change Party Name</h2>

            {/* Form for user to type name of party in */}
            <form>
                <input type="text" name="partyname" placeholder="Enter Party Name" value={pName} required/>
                <button type="submit" className={home.signlogButton}  style={{width: "35%"}}>EDIT PARTY</button>
            </form>
        </>
    )
}