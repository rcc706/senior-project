import home from "../styles/main.module.css";
import { useState } from "react";
const serverURL = import.meta.env.VITE_SERVER_URL;

export default function DeletePartyForm({partyId}) {

    // error id for rendering and a temporary storage array for the errors
    let error_id = 0;
    let errorsArray = [];

    // function that takes in an event (from the form) and handles the data and errors
    const submitHandler = e => {
        // prevent form reloading page after submission and clear any errors from the array
        e.preventDefault();
        setErrors([]);

        // make a post request to the server to update the password with the newly entered passwrod
        axios.post(`${serverURL}/deleteParty`, { currPassword, newPassword}, { withCredentials: true }).then(res => {
            
            // if all is good, set the states to an empty string and clear errors
            setCurrPassword('');
            setNewPassword('');
            setErrors([]);

            // successful update, logout
            handleLogout();
          }).catch(error => {
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
		});
      };

    

    return (
        <>
            <h1 style={{textAlign: "center"}}>Delete Party</h1>
            <h2 style={{fontSize: "22px"}}>This Party and all of its' Characters Will Be Deleted!</h2>

            {/* button to delete the party */}
            <form>
                <button type="submit" className={home.deleteAccountBtn}  style={{width: "25%"}}>DELETE PARTY</button>
            </form>
            
            <br />
        </>
    )
}