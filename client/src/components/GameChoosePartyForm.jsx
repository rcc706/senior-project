import home from "../styles/main.module.css";
import { useState } from "react";
import axios from "axios";

// serverURL environment variable from the .env file to reduce hardcoding links everywhere
const serverURL = import.meta.env.VITE_SERVER_URL;

export default function GameChoosePartyForm({isOpen, onClose, updateCharsArray}) {
    
    // States for the party that is picked (typed into the input field) and any errors 
    const [pickedParty, setPickedParty] = useState('')
    const [errors, setErrors] = useState([]);

    // error id for rendering and a temporary storage array for the errors
    let error_id = 0;
    let errorsArray = [];    

    // function to update the chars in the list in the party
    const handleCharsArray = (chArr) => {
        updateCharsArray(chArr);
    }

    // function that takes in an event (from the form) and handles the data and errors
    const submitHandler = e => {
        // prevent form reloading page after submission and clear any errors from the array
        e.preventDefault();
        setErrors([]);

        // make a post request to the server to get the chars that are in the party
        axios.post(`${serverURL}/getPartyChars`, {partyName: pickedParty}, {withCredentials: true}).then(res => {
            setErrors([]);

        }).catch(error => {
			// Based off of Axios documenation handling errors: https://axios-http.com/docs/handling_errors
				// error.response.data = data in the body of the reponse from server
				// errors is the returned array (of messages from express validator)
				// error.response.data.errors = array of validation errors sent from the server 
				// validationError.msg = An error message from one of the express-validator validations
					// more info: https://express-validator.github.io/docs/api/validation-result#error-types
			if (error.response.data.errors) {
				for (const validationError of error.response.data.errors) {
					const newError = { id: error_id++, message: validationError.msg }; // get new error message

					errorsArray.push(newError); // push error onto the temporary error array

					setErrors(errorsArray); // set the errors state to the temporary error array

				}
			} 

			// error.response.data.message = the message from an error caught by axios
			// set the errors array (to be renedered out below) to just this one error message
				// increment the error_id so it can be used when rendering the errors as list elements
			if (error.response.data.message) {
				setErrors([{ id: error_id++, message: error.response.data.message }]); // set the errors array to the server error message
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