import { useState } from "react";
import home from "../styles/main.module.css";
import useSessionData from "../components/useSessionData";
import axios from "axios";

// serverURL environment variable from the .env file to reduce hardcoding links everywhere
const serverURL = import.meta.env.VITE_SERVER_URL;

export default function NewPartyForm({onClose, setCorrectFormSubmission}) {

    const {username, email} = useSessionData();
    const [pName, setPName] = useState('');
    const [errors, setErrors] = useState([]);

    let error_id = 0;
	let errorsArray = [];


    const submitHandler = e => {
		e.preventDefault();


        // console.log(username.username) --> will return null (error) if session has expired!
		// post request to the server with sending the username and password from the login form
		axios.post(`${serverURL}/addParty`, { uName: username.username, pName: pName }, {withCredentials: true})
        .then(res => {

			// Logged in should've been successful, so seting the username, password, errors states to empty 
			setErrors([]);
			errorsArray = [];
            setCorrectFormSubmission(true);
            onClose();
        }).catch(error => {
			// Based off of Axios documenation handling errors: https://axios-http.com/docs/handling_errors
				// error.response.data = data in the body of the reponse from server
				// errors is the returned array (of messages from express validator)
				// error.response.data.errors = array of validation errors sent from the server 
				// validationError.msg = An error message from one of the express-validator validations
					// more info: https://express-validator.github.io/docs/api/validation-result#error-types
            if (error.response) {
                if (error.response.data.errors) {
                    for (const validationError of error.response.data.errors) {
                        const newError = { id: error_id++, message: validationError.msg }; // new error from the response
    
                        errorsArray.push(newError); // adding new error to the temporary array
    
                        setErrors(errorsArray); // updating state of errors array
    
                    }
                } 
    
                // error.response.data.message = the message from an error caught by axios
                // set the errors array (to be renedered out below) to just this one error message
                    // increment the error_id so it can be used when rendering the errors as list elements
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
            <h1 style={{textAlign: "center"}}>Create New Party</h1>
            <h2 style={{fontSize: "22px"}}>Enter Party Name Below</h2>

            {/* Form to create a new party */}
            <form>
                <input type="text" name="partyname" placeholder="Enter Party Name" value={pName} onChange={e => setPName(e.target.value)} required/>
                <button onClick={submitHandler} type="submit" className={home.signlogButton}  style={{width: "35%"}}>CREATE PARTY</button>
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