import {useState, useEffect} from "react";
import axios from 'axios';

// server url from the .env file, used for easier connections without hardcoding the link everywhere
const serverURL = import.meta.env.VITE_SERVER_URL;

// This function gets the username and email from the server
export default function useSessionData() {
    // States to update when the data is gotten
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);

    // useEffect to immediately make the GET request 
    useEffect(() => {
        axios.get(`${serverURL}/getUserData`, {withCredentials: true})
        .then (res => {
            // if the username exists in the session, set it
            if (res.data.username) {
                setUsername(res.data.username);
            }

            // if the email exists in the session, set it
            if (res.data.email) {
                setEmail(res.data.email);
            }
        })
    });

    // return both the username and email to be used in other pages/components
    return {username, email};
}