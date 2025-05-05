import home from "../styles/main.module.css";
import { useState } from "react";
import axios from "axios";
import useSessionData from "../components/useSessionData";

// serverURL environment variable from the .env file to reduce hardcoding links everywhere
const serverURL = import.meta.env.VITE_SERVER_URL;

export default function GameChoosePartyForm({onClose, updateCharsArray}) {

    // States for the party that is picked (typed into the input field) and any errors 
    const [pickedParty, setPickedParty] = useState('')
    const [errors, setErrors] = useState([]);
    const {username} = useSessionData();

    // error id for rendering and a temporary storage array for the errors
    let error_id = 0;
    let errorsArray = [];    

    // function to update the chars in the list in the party
    function handleCharsArray(chArr) {
        updateCharsArray(chArr);
    }

    // function that takes in an event (from the form) and handles the data and errors
    const submitHandler = e => {
        // prevent form reloading page after submission and clear any errors from the array
        e.preventDefault();
        setErrors([]);

        // make a post request to the server to get the character names of all the characters that are in the party
        axios.post(`${serverURL}/getCharacterNames`, {uName: username?.username, partyName: pickedParty}, {withCredentials: true})
        .then(res => {
            setErrors([]);                  // clearing out errors
            handleCharsArray(res.data);     // setting array of characters 
            onClose();                      // closing the form (when submitted correctly)
        }).catch(error => {
            if (error.response) {
                if (error.response.data.errors) {
                    for (const validationError of error.response.data.errors) {
                        const newError = { id: error_id++, message: validationError.msg }; // get new error message
    
                        errorsArray.push(newError); // push error onto the temporary error array
    
                        setErrors(errorsArray); // set the errors state to the temporary error array
    
                    }
                } 
                if (error.response.data.message) {
                    setErrors([{ id: error_id++, message: error.response.data.message }]); // set the errors array to the server error message
                }
            } else {
                console.error(error);
            }
		});
    };

    return (
        <>
            <h1 className={home.gameh1} style={{textAlign: "center"}}>Choose a Party to Play</h1>
            <h2 className={home.gameh2} style={{fontSize: "22px"}}>Enter One of Your Party Names Below</h2>

            {/* When the form submits, call the submit handler to send data to server and display errors*/}
            <form onSubmit={submitHandler}>
                <input type="text" name="gamePartyName" placeholder="Enter Party Name" value={pickedParty} onChange={e => setPickedParty(e.target.value)}required/>
                <button type="submit" className={home.signlogButton}  style={{width: "35%"}}>Choose PARTY</button>
            </form>

            {/* If there are any errors, display them */}
            {errors.length > 0 && (
                <ul>
                    {errors.map(error => (
                        <li key={error.id}>{error.message}</li>
                    ))}
                </ul>
            )}
        </>
    )
}