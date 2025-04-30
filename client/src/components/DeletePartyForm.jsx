import home from "../styles/main.module.css";
import { useState } from "react";
const serverURL = import.meta.env.VITE_SERVER_URL;
// `${serverURL}/`

export default function DeletePartyForm() {

    
    return (
        <>
            <h1 style={{textAlign: "center"}}>Delete Party</h1>
            <h2 style={{fontSize: "22px"}}>This Party and all of its' Characters Will Be Deleted!</h2>

            <form>
                <button type="submit" className={home.deleteAccountBtn}  style={{width: "25%"}}>DELETE PARTY</button>
            </form>
            
            <br />
        </>
    )
}