import { useState } from "react";
import home from "../styles/main.module.css";
import useSessionData from "../components/useSessionData";
import axios from "axios";

// serverURL environment variable from the .env file to reduce hardcoding links everywhere
const serverURL = import.meta.env.VITE_SERVER_URL;

export default function NewCharForm({partyId}) {
    const {username, email} = useSessionData();
    const [errors, setErrors] = useState([]);
    const [characters, setCharacters] = useState([]);

    const [charClass, setCharClass] = useState("");
    const [charName, setCharName] = useState("");

    let error_id = 0;
	let errorsArray = [];

    const submitHandler = e => {
        e.preventDefault();

		axios.post(`${serverURL}/addCharacter`, { uName: username.username, chName: charName, chClass: charClass, partyId: partyId}, {withCredentials: true})
        .then((res) => {
            // Logged in should've been successful, so seting the username, password, errors states to empty 
			setErrors([]);
			errorsArray = [];
            onClose();

            setCharacters(res.data);
        }).catch(error => {
            if (error.response) {
                if (error.response.data.errors) {
                    for (const validationError of error.response.data.errors) {
                        const newError = { id: error_id++, message: validationError.msg }; // new error from the response
    
                        errorsArray.push(newError); // adding new error to the temporary array
    
                        setErrors(errorsArray); // updating state of errors array
    
                    }
                } 
                if (error.response.data.message) {
                    errorsArray.push({ id: error_id++, message: error.response.data.message }) // adding new error to the temporary array
                    setErrors(errorsArray); // updating state of errors array
                }
            } else {
                errorsArray.push({ id: error_id++, message: "Sever Error" }); // updating state of errors array
                setErrors(errorsArray); // updating state of errors array
            }
        });
    }

    return (
        <>
            <h1 style={{textAlign: "center"}}>Create New Character</h1>
            <h2 style={{fontSize: "22px"}}>Enter Character Class and Name Below</h2>

            {/* Form to create a new character, select from 4 of the different races */}
            <form>
                <select name="charClass" required onChange={e => setCharClass(e.target.value)}>
                    <option defaultValue={""}>Pick Hero Class</option>
                    <option value="hatchet">Inox Hatchet</option>
                    <option value="demolitionist">Quatryl Demolitionist</option>
                    <option value="voidwarden">Human Voidwarden</option>
                    <option value="redguard">Valrath Red Guard</option>
                </select>
                <input type="text" name="charname" placeholder="Enter Character Name" onChange={e => setCharName(e.target.value)}required />
                <button onClick={submitHandler} type="submit" className={home.signlogButton} style={{width: "40%"}}>CREATE CHARACTER</button>
            </form>

            {/* display validatotion and server errors */}
            {errors.length > 0 && (
                <ul>
                    {errors.map((error) => (
                        <li key={error.id}>{error.message}</li>
                    ))}
                </ul>
            )}
        </>
    )
}