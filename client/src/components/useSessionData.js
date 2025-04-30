import {useState, useEffect} from "react";
import axios from 'axios';
const serverURL = import.meta.env.VITE_SERVER_URL;

export default function useSessionData() {
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);

    useEffect(() => {
        axios.get(`${serverURL}/getUserData`, {withCredentials: true})
        .then (res => {
            if (res.data.username) {
                setUsername(res.data.username);
                setEmail(res.data.email);
            }
        })
    });

    return {username, email};
}