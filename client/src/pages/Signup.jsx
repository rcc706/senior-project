import {Link} from "react-router-dom";
import home from "../styles/main.module.css";
import axios from 'axios';
import { useState } from "react";
import { Navigate } from "react-router-dom";

// server url from the .env file 
const serverURL = import.meta.env.VITE_SERVER_URL;


export default function Signup() {

    // States for form fields (username, email, password, confpassword)
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confpassword, setConfPassword] = useState('');

    // state that determines if the user is signedup correctly or not
    const [signedUp, setSignedUp] = useState(false);

    // state of errors to keep track of (general server errors and express-validator errors)
    const [errors, setErrors] = useState([]);

    // error id to keep track of rendering the errors and an errorsArray as temporary storage for the errorsf
	let error_id = 0;
	let errorsArray = [];

    const submitHandler = e => {
        // Prevent the default html form (reloading page) and clearing any errors that are left in the errors array state
        e.preventDefault();
        setErrors([]); 

        // Make a post request to the server at the signup route, passing in the username, email, password, and confirmed password as an object
        axios.post(`${serverURL}/signup`, {username: username, email: email, password: password, confpassword: confpassword})
        .then((res) => {

            // All is good, clear the form fields
            setUsername('');
            setEmail('');
            setPassword('');   
            setConfPassword('');

            // user is signed in, will redirect to login page
            setSignedUp(true);

            // clear the errors
            setErrors([]);
            errorsArray = [];
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
                    setErrors([errorsArray]); // updating state of errors array
                }
            } else {
                errorsArray.push({ id: error_id++, message: "Sever Error" }); // updating state of errors array
                setErrors(errorsArray); // updating state of errors array
            }
        });
    };

    return (
        <>
            <div className={home.container}>
                <h1 style={{textAlign: "center"}}>Gloomhaven Game Assist</h1>
                <h2 style={{fontSize: "22px"}}>Join Fellow Adventurers and Forge Your Path</h2>

                {/* When form is done, call the submit handler function to handle the signup data */}
                {/* when the data in the field changes, set the corresponding state to its value  */}
                <form onSubmit={submitHandler}>
                    <input type="text" name="username" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <input type="text" name="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" name="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <input type="password" name="confirm_password" placeholder="Confirm Password" value={confpassword} onChange={(e) => setConfPassword(e.target.value)} required /> 
                    <button type="submit" className={home.signlogButton}>SIGN UP</button>
                </form>

                {/* User is signdUp correctly with no errors, navigate to the login page */}
                {signedUp && <Navigate to="/login" replace={true}/>}
                
				{/* if here are any errors, print each error from the errors array and map it to a unique (with key) list element with its error message */}
                {errors.length > 0 && (
                    <ul>
                        {errors.map((error) => (
                            <li key={error.id}>{error.message}</li>
                        ))}
                    </ul>
                )}

                {/* Footer for the signup page, can go to the login page and the landing page */}
                <div className={home.footer}>
                    <p>Already a member?&nbsp;&nbsp;&nbsp;<Link to="/login">Login Here</Link></p>
                    <Link to="/" style={{fontSize: "30px", color: "#d4af37"}}>GH</Link>        
                </div>
            </div>
        </>
    )
}
