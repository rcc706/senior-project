import { useState, useEffect } from "react";
import pop from "../styles/popup.module.css";
import party from "../styles/main.module.css";
import axios from 'axios';
import useSessionData from "../components/useSessionData";
import EditCharForm from "../components/EditCharForm";


// serverURL environment variable from the .env file to reduce hardcoding links everywhere
const serverURL = import.meta.env.VITE_SERVER_URL;

export default function Character({charClass, charName, charLevel, totalXP, charGold, partyName}) {
    const {username} = useSessionData();

    // index used for rendering the components so they have different keys
    let nextIndex = 0;

    // state to track of the new character form is open
    const [isEditCharacterPopupOpen, setEditCharacterPopupOpen] = useState(false);
    const toggleEditCharacterPopup = () => setEditCharacterPopupOpen(!isEditCharacterPopupOpen);

    const [isDeleteCharacterPopupOpen, setDeleteCharacterPopupOpen] = useState(false);
    const toggleDeleteCharacterPopup = () => setDeleteCharacterPopupOpen(!isDeleteCharacterPopupOpen);

    const [items, setItems] = useState([]);

    const [correctFormSubmission, setCorrectFormSubmission] = useState(false);
    const [godpleasehelpme, setgodpleasehelpme] = useState(true);


    const getItems = async () => {
        try {

            // awaiting on the post request to the server (trying to get the names of all the parties that belong to the user)
            const serverResponse = await axios.post(`${serverURL}/getItems`, { username: username?.username, charName: charName, partyName: partyName});

            // if the axios post request resolved, then set the parties array to the data of the response (an array)
            setItems(serverResponse.data);

        } catch (error) {
            // Won't be displaying errors like in the forms, so replaced with this to avoid updating the errors[] state all the time
            console.error(error);
        }

    }

    useEffect(() => {
        if (username) {
            getItems();
        }

        setCorrectFormSubmission(false);
    }, [username]);

    return (
        <>
            <br />
            <div className={party.subcontainer}>
                <div className={party.charHeader}>
                    <p>{charName}</p>

                    <button onClick={toggleEditCharacterPopup} className={pop.addScen} style={{right: "60px"}}><img src="../../assets/edit_party.png" alt="editChar" width="24" height="24" /></button>
                    <button onClick={toggleDeleteCharacterPopup} className={pop.addScen}><img src="../../assets/red_x.png" alt="deleteChar" width="24" height="24" /></button>
                </div>

                <hr />
                <br />

                <ul>
                    <li>Stats: 
                        <ul>
                            <li>Class: {charClass}</li>
                            <li>Level: {charLevel}</li>
                            <li>Experience Points: {totalXP}</li>
                            <li>Gold: {charGold}</li>
                        </ul>
                    </li>
                    <li></li>
                    <li>Items:
                        {items.length > 0 ? (
                            <ul>
                                {items.map(item => (
                                    <li key={nextIndex++}>{item.ITEMTYPE}: {item.ITEMNAME}</li>
                                ))}
                            </ul>
                        ) : (
                            <ul><li>No Items</li></ul>
                        )}
                    </li>
                </ul>
            </div> 

            {isEditCharacterPopupOpen && (<div className={pop.popupOverlay}>
                    <div className={party.subcontainer}>
                        <button onClick={toggleEditCharacterPopup}>X</button>
                        <EditCharForm onClose={toggleEditCharacterPopup} setCorrectFormSubmission={setCorrectFormSubmission} charName={charName}/>
                    </div>
            </div>)}
        </>
    )
}