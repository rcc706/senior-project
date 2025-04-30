import { useState } from "react";
import home from "../styles/main.module.css";

export default function NewPartyForm() {

    const [pName, setPName] = useState();

    return (
        <>
            <h1 style={{textAlign: "center"}}>Create New Party</h1>
            <h2 style={{fontSize: "22px"}}>Enter Party Name Below</h2>

            <form>
                <input type="text" name="partyname" placeholder="Enter Party Name" value={pName} required/>
                <button type="submit" className={home.signlogButton}  style={{width: "35%"}}>CREATE PARTY</button>
            </form>
        </>
    )
}