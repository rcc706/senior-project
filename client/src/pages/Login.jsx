import { useState } from "react";
import { Link, Navigate} from "react-router-dom";
import axios from "axios";
import home from "../styles/main.module.css";

// server url from the .env file
const serverURL = import.meta.env.VITE_SERVER_URL;

export default function Login() {
	// states to manage the fields from the login and errors from the server
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState([]);

	// state for if the user is logged in correctly, default is false
	const [loggedIn, setLoggedIn] = useState(false);

	// error id for rendering and a temporary storage array for the errors
	let error_id = 0;
	let errorsArray = [];

	const submitHandler = e => {
		// prevent default form submission (reloading the page) and setting the errors array to empty
		e.preventDefault();
		setErrors([]);

		// post request to the server with sending the username and password from the login form
		axios.post(`${serverURL}/login`, { username, password }, { withCredentials: true }).then(res => {

			// Logged in should've been successful, so seting the username, password, errors states to empty 
			setUsername('');
			setPassword('');
			setErrors([]);
			errorsArray = [];

			// Logged in successfully, setting loggedIn state to true for navigation 
			setLoggedIn(true);
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
			<div className={home.container}>
				<h1 style={{ textAlign: "center" }}>Gloomhaven Game Assist</h1>
				<h2 style={{ fontSize: "22px" }}>Your Quest is Far From Over</h2>

				{/* login form that calls the submithandler function when done */}
				{/* passes in the updated state of the username and the password when the value changes in the form field */}
				<form onSubmit={submitHandler}>
					<input type="text" name="username" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
					<input type="password" name="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
					<button type="submit" className={home.signlogButton}>LOGIN</button>
				</form>

				{/* if here are any errors, print each error from the errors array and map it to a unique (with key) list element with its error message */}
				{errors.length > 0 && (
					<ul>
						{errors.map(error => (
							<li key={error.id}>{error.message}</li>
						))}
					</ul>
				)}

				{/* footer for the login page, redirect to signup and the landing page if needed */}
				<div className={home.footer}>
					<p>Need an account?&nbsp;&nbsp;&nbsp;<Link to="/signup">Signup Here</Link></p>
					<Link to="/" style={{ fontSize: "30px", color: "#d4af37" }}>GH</Link>
				</div>
			</div>
            
			{/* if the user is signed up without an errors, redirect to login with not allowing to go back in browser */}
			{loggedIn && <Navigate to="/home" replace={true}/>}
		</>
	);
}
