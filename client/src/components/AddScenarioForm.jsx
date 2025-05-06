import { useState } from "react";
import home from "../styles/main.module.css";
import useSessionData from "../components/useSessionData";
import axios from "axios";

// serverURL environment variable from the .env file to reduce hardcoding links everywhere
const serverURL = import.meta.env.VITE_SERVER_URL;

export default function AddScenarioForm({onClose, setCorrectFormSubmission, partyName}) {
    const {username} = useSessionData();
    const [scenName, setScenName] = useState('');
    const [errors, setErrors] = useState([]);

    let error_id = 0;
	let errorsArray = [];

    const submitHandler = e => {
		e.preventDefault();

        console.log(`${username.username}\t${partyName}\t${scenName}`)

        // post request to the server with sending the username and password from the login form
		axios.post(`${serverURL}/addScenario`, { uName: username.username, partyName: partyName, scenName: scenName}, {withCredentials: true})
        .then(res => {
			setErrors([]);
			errorsArray = [];
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
            <h1 style={{textAlign: "center"}}>Add a Completed Scenario</h1>
            <h2 style={{fontSize: "22px"}}>Select a Scenario Below</h2>

            {/* Form with a select drop down menu for people to select the scenario they want to add */}
            <form onSubmit={submitHandler}>
                <select id="compScen" name="compScen" value={scenName} onChange={e => setScenName(e.target.value)} required>
                    <option defaultValue={""}>Pick Scenario</option>
                    <option value="Roadside Ambush">Roadside Ambush</option>
                    <option value="A Hole in the Wall">A Hole in the Wall</option>
                    <option value="The Black Ship">The Black Ship</option>
                    <option value="A Ritual in Stone">A Ritual in Stone</option>
                    <option value="A Deeper Understanding">A Deeper Understanding</option>
                    <option value="Corrupted Research">Corrupted Research</option>
                    <option value="Sunken Tumor">Sunken Tumor</option>
                    <option value="Hidden Tumor">Hidden Tumor</option>
                    <option value="Explosive Evolution">Explosive Evolution</option>
                    <option value="The Guantlet">The Guantlet</option>
                    <option value="Defiled Sewers">Defiled Sewers</option>
                    <option value="Beguiling Sewers">Beguiling Sewers</option>
                    <option value="Vile Harvest">Vile Harvest</option>
                    <option value="Toxic Harvest">Toxic Harvest</option>
                    <option value="Tainted Blood">Tainted Blood</option>
                    <option value="Mixed Results">Mixed Results</option>
                    <option value="Red Twilight">Red Twilight</option>
                    <option value="The Heist">The Heist</option>
                    <option value="Den of Thieves">Den of Thieves</option>
                    <option value="Misplaced Goods">Misplaced Goods</option>
                    <option value="Agents of Chaos">Agents of Chaos</option>
                    <option value="Unfriendly Message">Unfriendly Message</option>
                    <option value="Best of the Best">Best of the Best</option>
                    <option value="Warding the Void">Warding the Void</option>
                    <option value="The Greatest Job in the World">The Greatest Job in the World</option>
                </select>

                {/* closes the form and submits the data */}
                <button type="submit" className={home.signlogButton} style={{width: "40%"}}>ADD COMPLETED SCENARIO</button>
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