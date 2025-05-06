import { useState } from "react";
import home from "../styles/main.module.css";
import useSessionData from "../components/useSessionData";
import axios from "axios";

// serverURL environment variable from the .env file to reduce hardcoding links everywhere
const serverURL = import.meta.env.VITE_SERVER_URL;

export default function EditCharForm({onClose, setCorrectFormSubmission, charName, partyName}) {

    const {username} = useSessionData();
    const [errors, setErrors] = useState([]);

    let error_id = 0;
	let errorsArray = [];

    const [level, setLevel] = useState(0);
    const [experience, setExperience] = useState(0);
    const [gold, setGold] = useState(0);
    const [headitem, setHeadItem] = useState("");
    const [chestitem, setChestItem] = useState("");
    const [onehandeditem, setOneHandedItem] = useState("");
    const [feetitem, setFeetItem] = useState("");



    const submitHandler = e => {
		e.preventDefault();

        axios.post(`${serverURL}/updateCharacter`, { 
            uName: username.username, 
            charName: charName,
            level: level,
            experience: experience,
            gold: gold,
            headitem: headitem,
            chestitem: chestitem,
            onehandeditem: onehandeditem,
            feetitem: feetitem,
            partyName: partyName}, {withCredentials: true})
        .then(res => {

			// Logged in should've been successful, so seting the username, password, errors states to empty 
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
            <h1 style={{textAlign: "center"}}>Edit Current Character</h1>
            <h2 style={{fontSize: "22px"}}>Change Character Stats and Items Below</h2>

            <form onSubmit={submitHandler}>
                {/* Update the character level, total expierence, and gold*/}
                <input type="number" name="charlevel" min="1" max="9" placeholder="Enter Level" onChange={(e) => setLevel(e.target.value)}/> 
                <input type="number" name="charexp" min="0" placeholder="Enter Experience Points" onChange={(e) => setExperience(e.target.value)}/> 
                <input type="number" name="chargold" min="0" placeholder="Enter Gold" onChange={(e) => setGold(e.target.value)}/> 

                <br />

                {/* select a head item  */}
                <select name="charitemhead" value={headitem} onChange={e => setHeadItem(e.target.value)}>
                    <option defaultValue={""}>Pick Head Item</option>
                    <option value="Eagle-Eye Goggles">Eagle-Eye Goggles</option>
                    <option value="Iron Helmet">Iron Helmet</option>
                </select>

                {/* select chest item */}
                <select name="charitemchest" value={chestitem} onChange={e => setChestItem(e.target.value)}>
                    <option defaultValue={""}>Pick Chest Item</option>
                    <option value="Chain Armor">Chain Armor</option>
                    <option value="Studded Leather">Studded Leather</option>
                </select>

                {/* select one-handed item */}
                <select name="charitemonehanded" value={onehandeditem} onChange={e => setOneHandedItem(e.target.value)}>
                    <option defaultValue={""}>Pick One-Handed Item</option>
                    <option value="Heater Shield">Heater Shield</option>
                    <option value="Throwing Hammer">Throwing Hammer</option>
                    <option value="Poison Dagger">Poison Dagger</option>
                    <option value="Iron Spear">Iron Spear</option>
                </select>

                {/* select feet item */}
                <select name="charitemfeet" value={feetitem} onChange={e => setFeetItem(e.target.value)}>
                    <option defaultValue={""}>Pick Feet Item</option>
                    <option value="Weathered Boots">Weathered Boots</option>
                    <option value="Winged Shoes">Winged Shoes</option>
                </select>

                {/* button that will submit the form and close the popup */}
                <button type="submit" className={home.signlogButton} style={{width: "40%"}}>EDIT CHARACTER</button>
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