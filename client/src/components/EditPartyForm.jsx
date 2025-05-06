import { useState } from "react";
import home from "../styles/main.module.css";
import useSessionData from "../components/useSessionData";
import axios from "axios";

// serverURL environment variable from the .env file to reduce hardcoding links everywhere
const serverURL = import.meta.env.VITE_SERVER_URL;


export default function EditPartyForm({onClose, setCorrectFormSubmission, partyName, setParName}) {

    const {username, email} = useSessionData();
    const [pName, setPName] = useState('');
    const [errors, setErrors] = useState([]);

    let error_id = 0;
	let errorsArray = [];

    const submitHandler = e => {
		e.preventDefault();


        // console.log(username.username) --> will return null (error) if session has expired!
		// post request to the server with sending the username and password from the login form
		axios.post(`${serverURL}/updatePartyName`, { uName: username.username, pName: pName, currPName: partyName}, {withCredentials: true})
        .then(res => {

			// Logged in should've been successful, so seting the username, password, errors states to empty 
			setErrors([]);
			errorsArray = [];
            setParName(pName);
            setCorrectFormSubmission(true);
            onClose();
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
            <h1 style={{textAlign: "center"}}>Edit Current Party</h1>
            <h2 style={{fontSize: "22px"}}>Change Party Name</h2>

            {/* Form for user to type name of party in */}
            <form onSubmit={submitHandler}>
                <input type="text" name="partyname" placeholder="Enter Party Name" value={pName} onChange={(e) => setPName(e.target.value)} required/>
                <button type="submit" className={home.signlogButton}  style={{width: "35%"}}>EDIT PARTY</button>
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