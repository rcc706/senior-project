import home from "../styles/main.module.css";
import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

// serverURL environment variable from the .env file to reduce hardcoding links everywhere
const serverURL = import.meta.env.VITE_SERVER_URL;

export default function UpdatePasswordForm() {

    // states to manage the fields from the form and errors from the server
    const [loggedOut, setLoggedOut] = useState(false);
    const [currPassword, setCurrPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [errors, setErrors] = useState([]);
    
	// error id for rendering and a temporary storage array for the errors
    let error_id = 0;
    let errorsArray = [];

    const handleLogout = async () => {
      try {
        // Send post request to server to logout, not sending any data --> {}
        const response = await axios.post(`${serverURL}/logout`, {}, {withCredentials: true});
  
        // if the status is OKAY, then set the the session is destroyed and user should be logged out, else console the errors
        if (response.status === 200) {
            setLoggedOut(true);
        } else {
            console.error("Logout failed");
        }
      } catch (error) {
            console.error("Logout error:", error);
      }
    };

    // function that takes in an event (from the form) and handles the data and errors
    const submitHandler = e => {
        // prevent form reloading page after submission and clear any errors from the array
        e.preventDefault();
        setErrors([]);

        // make a post request to the server to update the password with the newly entered passwrod
        axios.post(`${serverURL}/updatePassword`, { currPassword, newPassword}, { withCredentials: true }).then(res => {
            
            // if all is good, set the states to an empty string and clear errors
            setCurrPassword('');
            setNewPassword('');
            setErrors([]);

            // successful update, logout
            handleLogout();
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
            <h1 style={{textAlign: "center"}}>Update Password</h1>
            <h2 style={{fontSize: "22px"}}>Enter Both Current And New Passwords Below</h2>

            {/* When the form submits, call the submit handler to send data to server and display errors*/}
            <form onSubmit={submitHandler}>
                <input style={{width: "35%"}} type="password" name="currPassword" placeholder="Enter Current Password" value={currPassword} onChange={e => setCurrPassword(e.target.value)} required/>
                <input style={{width: "35%"}} type="password" name="newPassword" placeholder="Enter New Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required/>
                <button type="submit" className={home.signlogButton}  style={{width: "25%"}}>UPDATE PASSWORD</button>
            </form>

              {/* If there are any errors, display them */}
              {errors.length > 0 && (
                  <ul>
                      {errors.map(error => (
                      <li key={error.id}>{error.message}</li>
                      ))}
                  </ul>
              )}
            
            {/* If loggedOut is true (session should be destoryed too) navigate to the landing page*/}
            {loggedOut && <Navigate to="/" replace />}  
        </>
    )
}