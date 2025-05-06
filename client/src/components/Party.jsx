import { useState, useEffect } from "react";
import pop from "../styles/popup.module.css";
import party from "../styles/main.module.css";
import Popup from "../components/Popup";
import EditPartyForm from "../components/EditPartyForm";
import NewCharForm from "../components/NewCharForm";
import DeletePartyForm from "../components/DeletePartyForm";
import AddScenarioForm from "../components/AddScenarioForm";
import DeleteCharForm from "../components/DeleteCharForm";
import EditCharForm from "../components/EditCharForm";
import axios from 'axios';
import useSessionData from "../components/useSessionData";


// serverURL environment variable from the .env file to reduce hardcoding links everywhere
const serverURL = import.meta.env.VITE_SERVER_URL;


export default function Party({ partyName, partyDesc, partyId}) {

    const {username} = useSessionData();

    // index used for rendering the components so they have different keys
    let nextIndex = 0;

    // states that switch the state of the forms being open or not
        // FORMS: edit party, new character, delete party, add scenario, delete character, edit character

    const [isEditPartyPopupOpen, setEditPartyPopupOpen] = useState(false);
    const toggleEditPartyPopup = () => setEditPartyPopupOpen(!isEditPartyPopupOpen);

    const [isNewCharacterPopupOpen, setNewCharacterPopupOpen] = useState(false);
    const toggleNewCharacterPopup = () => setNewCharacterPopupOpen(!isNewCharacterPopupOpen);

    const [isDeletePartyPopupOpen, setDeletePartyPopupOpen] = useState(false);
    const toggleDeletePartyPopupOpen = () => setDeletePartyPopupOpen(!isDeletePartyPopupOpen);

    const [isAddScenarioPopupOpen, setAddScenarioPopupOpen] = useState(false);
    const toggleAddScenarioPopupOpen = () => setAddScenarioPopupOpen(!isAddScenarioPopupOpen);

    const [isDeleteCharPopupOpen, setDeleteCharPopupOpen] = useState(false);
    const toggleDeleteCharPopupOpen = () => setDeleteCharPopupOpen(!isDeleteCharPopupOpen);
    
    const [isEditCharPopupOpen, setEditCharPopupOpen] = useState(false);
    const toggleEditCharPopupOpen = () => setEditCharPopupOpen(!isEditCharPopupOpen);

    const [scenarios, setScenarios] = useState([]);
    const [godpleasehelpme, setgodpleasehelpme] = useState(true);
    const [correctFormSubmission, setCorrectFormSubmission] = useState(false);
    const [parName, setParName] = useState(partyName);

    const getScenarios = async () => {
        try {

            // awaiting on the post request to the server (trying to get the names of all the parties that belong to the user)
            const serverResponse = await axios.post(`${serverURL}/getScenarios`, { partyName: parName });

            // if the axios post request resolved, then set the parties array to the data of the response (an array)
            setScenarios(serverResponse.data);

            // user has visited page not for first time idk, womp womp
            setgodpleasehelpme(false);


        } catch (error) {
            // Won't be displaying errors like in the forms, so replaced with this to avoid updating the errors[] state all the time
            console.error(error);
        }
    }

    useEffect(() => {
        if ((godpleasehelpme || correctFormSubmission) && username) {
            getScenarios();
        }

        setCorrectFormSubmission(false);
    }, [correctFormSubmission, username]);

    return (
        <>
            {/* Party "header" --> Party name, edit party and delete party buttons -----------------------------------------------------------------------------------------------------------------------------------------------*/}
            <div className={party.container}>
                <nav>
                    <ul className={party.nav__links}>
                        <li><h1>{parName}</h1></li>
                        <li><button onClick={toggleEditPartyPopup} className={pop.addScen} style={{right: "100px"}}><img src="../../assets/edit_party.png" alt="editParty" width="48" height="48" /></button></li>
                        <li><button onClick={toggleDeletePartyPopupOpen} className={pop.addScen}><img src="../../assets/red_x.png" alt="deleteParty" width="48" height="48" /></button></li>
                    </ul>
                </nav>
                <br />
                <hr style={{color: "#d4af37"}} />

                {/* 1st Party subsection --> Completed scenarios --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
                <div className={party.subcontainer}>
                    <div className={party.charHeader}>
                        <p>{partyDesc}</p>
                        <button onClick={toggleAddScenarioPopupOpen} className={pop.addScen}><img src="../../assets/edit_party.png" alt="editScen" width="24" height="24" /></button>
                    </div>

                    <hr />
                    <br />

                    {scenarios.length > 0 ? (
                            <ul>
                                {scenarios.map(scen => (
                                    <li key={nextIndex++}>{scen.SCENNAME}</li>
                                ))}
                            </ul>
                        ) : (
                            <ul>
                                <li key={nextIndex++}>No Scenarios Completed</li>
                            </ul>
                    )}
                </div>

                {/* 1st Character: Name and edit character button + delete character button ------------------------------------------------------------------------------------------*/}

                <br />
                <div className={party.subcontainer}>
                    <div className={party.charHeader}>
                        <p>Osoric Yanthus</p>

                        <button onClick={toggleEditCharPopupOpen} className={pop.addScen} style={{right: "60px"}}><img src="../../assets/edit_party.png" alt="editChar" width="24" height="24" /></button>
                        <button onClick={toggleDeleteCharPopupOpen} className={pop.addScen}><img src="../../assets/red_x.png" alt="deleteChar" width="24" height="24" /></button>
                    </div>

                    <hr />
                    <br />

                {/* HARDCODED GARBAGE - character stats -------------------------------------------------------------------------------------------------------------------------- */}

                    <ul>
                        <li>Stats: 
                            <ul>
                                <li>Race: Quatryl Demolitionist</li>
                                <li>Level: 1</li>
                                <li>Experience Points: 23</li>
                                <li>Gold: 5</li>
                            </ul>
                        </li>
                        <li></li>
                        <li>Items:
                            <ul>
                                <li>Head: Iron Helmet</li>
                                <li>Chest: Chain Armor</li>
                                <li>One-Handed: Poison Dagger</li>
                                <li>Feet: Winged Shoes</li>
                            </ul>
                        </li>
                    </ul>
                </div>

                {/* The different popups for all the forms that display from the buttons mentioned above-------------------------------------------------------------------------*/}

                {isEditPartyPopupOpen && (<div className={pop.popupOverlay}>
                    <div className={party.subcontainer}>
                        <button onClick={toggleEditPartyPopup}>X</button>
                        <EditPartyForm onClose={toggleEditPartyPopup} setCorrectFormSubmission={setCorrectFormSubmission} partyName={parName} setParName={setParName}/>
                    </div>
                </div>)}

                <Popup 
                    key={nextIndex++}
                    isOpen={isDeletePartyPopupOpen} 
                    onClose={toggleDeletePartyPopupOpen} 
                    Component={DeletePartyForm}
                />

                {isAddScenarioPopupOpen && (<div className={pop.popupOverlay}>
                    <div className={party.subcontainer}>
                        <button onClick={toggleAddScenarioPopupOpen}>X</button>
                        <AddScenarioForm onClose={toggleAddScenarioPopupOpen} setCorrectFormSubmission={setCorrectFormSubmission} partyName={parName}/>
                    </div>
                </div>)}

                <Popup 
                    key={nextIndex++}
                    isOpen={isDeleteCharPopupOpen} 
                    onClose={toggleDeleteCharPopupOpen} 
                    Component={DeleteCharForm}
                />

                <Popup 
                    key={nextIndex++}
                    isOpen={isEditCharPopupOpen} 
                    onClose={toggleEditCharPopupOpen} 
                    Component={EditCharForm}
                />

                <div className={party.subcontainer} style={{width: "20%"}}>
                    <div className={party.flexCont}>
                        <button onClick={toggleNewCharacterPopup} className={party.userprofButton}>Add Character</button>
                        <Popup 
                            key={nextIndex++}
                            isOpen={isNewCharacterPopupOpen} 
                            onClose={toggleNewCharacterPopup} 
                            Component={NewCharForm}
                        />                    
                    </div>
                </div>
            </div>
        </>
    )
}