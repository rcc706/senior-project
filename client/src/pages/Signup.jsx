import {Link} from "react-router-dom";
import home from "../styles/main.module.css";
import axios from 'axios';
import { useState } from "react";
import { Navigate } from "react-router-dom";
const serverURL = import.meta.env.VITE_SERVER_URL;


export default function Signup() {

    // States for form fields (username, email, password, confpassword)
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confpassword, setConfPassword] = useState('');

    const [signedUp, setSignedUp] = useState(false);
    const [errors, setErrors] = useState([]);

	let error_id = 0;

	let errorsArray = [];

    const submitHandler = e => {
        e.preventDefault();
        setErrors([]); 
        axios.post(`${serverURL}/signup`, {username: username, email: email, password: password, confpassword: confpassword})
        .then((res) => {

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
                        const newError = { id: error_id++, message: validationError.msg };
    
                        errorsArray.push(newError);
    
                        setErrors(errorsArray);
    
                    }
                } 
    
                // error.response.data.message = the message from an error caught by axios
                // set the errors array (to be renedered out below) to just this one error message
                    // increment the error_id so it can be used when rendering the errors as list elements
                if (error.response.data.message) {
                    errorsArray.push({ id: error_id++, message: error.response.data.message })
                    setErrors([errorsArray]);
                }
            } else {
                errorsArray.push({ id: error_id++, message: "Sever Error" })
                setErrors(errorsArray);
            }
        });
    };

    return (
        <>
            <div className={home.container}>
                <h1 style={{textAlign: "center"}}>Gloomhaven Game Assist</h1>
                <h2 style={{fontSize: "22px"}}>Join Fellow Adventurers and Forge Your Path</h2>

                <form onSubmit={submitHandler}>
                    <input type="text" name="username" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <input type="text" name="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" name="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <input type="password" name="confirm_password" placeholder="Confirm Password" value={confpassword} onChange={(e) => setConfPassword(e.target.value)} required /> 
                    <button type="submit" className={home.signlogButton}>SIGN UP</button>
                </form>

                {signedUp && <Navigate to="/login" replace={true}/>}
                
				{/* if here are any errors, print each error from the errors array and map it to a unique (with key) list element with its error message */}
                {errors.length > 0 && (
                    <ul>
                        {errors.map((error) => (
                            <li key={error.id}>{error.message}</li>
                        ))}
                    </ul>
                )}

                <div className={home.footer}>
                    <p>Already a member?&nbsp;&nbsp;&nbsp;<Link to="/login">Login Here</Link></p>
                    <Link to="/" style={{fontSize: "30px", color: "#d4af37"}}>GH</Link>        
                </div>
            </div>
        </>
    )
}
