import { useState } from "react";
import { Link, Navigate} from "react-router-dom";
import axios from "axios";
import home from "../styles/main.module.css";

const serverURL = import.meta.env.VITE_SERVER_URL;

export default function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState([]);

	const [loggedIn, setLoggedIn] = useState(false);

	let error_id = 0;

	let errorsArray = [];

	const submitHandler = e => {
		e.preventDefault();
		setErrors([]);
		axios.post(`${serverURL}/login`, { username, password }, { withCredentials: true }).then(res => {
			setUsername('');
			setPassword('');
			setErrors([]);
			errorsArray = [];
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
					const newError = { id: error_id++, message: validationError.msg };

					errorsArray.push(newError);

					setErrors(errorsArray);

				}
			} 

			// error.response.data.message = the message from an error caught by axios
			// set the errors array (to be renedered out below) to just this one error message
				// increment the error_id so it can be used when rendering the errors as list elements
			if (error.response.data.message) {
				setErrors([{ id: error_id++, message: error.response.data.message }]);
			}
		});
	};

	return (
		<>
			<div className={home.container}>
				<h1 style={{ textAlign: "center" }}>Gloomhaven Game Assist</h1>
				<h2 style={{ fontSize: "22px" }}>Your Quest is Far From Over</h2>

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
