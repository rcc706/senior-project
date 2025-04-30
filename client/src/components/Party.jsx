import { useState } from "react";
import pop from "../styles/popup.module.css";
import party from "../styles/main.module.css";
import Popup from "../components/Popup";
import EditPartyForm from "../components/EditPartyForm";
import NewCharForm from "../components/NewCharForm";
import DeletePartyForm from "../components/DeletePartyForm";
import AddScenarioForm from "../components/AddScenarioForm";
import DeleteCharForm from "../components/DeleteCharForm";
import EditCharForm from "../components/EditCharForm";

export default function Party({ partyName, partyDesc }) {

    let nextIndex = 0;

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

    return (
        <>
            <div className={party.container}>
                <nav>
                    <ul className={party.nav__links}>
                        <li><h1>{partyName}</h1></li>
                        <li><button onClick={toggleEditPartyPopup} className={pop.addScen} style={{right: "100px"}}><img src="../../assets/edit_party.png" alt="editParty" width="48" height="48" /></button></li>
                        <li><button onClick={toggleDeletePartyPopupOpen} className={pop.addScen}><img src="../../assets/red_x.png" alt="deleteParty" width="48" height="48" /></button></li>
                    </ul>
                </nav>
                <br />
                <hr style={{color: "#d4af37"}} />
                <div className={party.subcontainer}>
                    <div className={party.charHeader}>
                        <p>{partyDesc}</p>
                        <button onClick={toggleAddScenarioPopupOpen} className={pop.addScen}><img src="../../assets/edit_party.png" alt="editScen" width="24" height="24" /></button>
                    </div>

                    <hr />
                    <br />

                    <ul>
                        <li>Roadside Ambush</li>
                        <li>A Hole in the Wall</li>
                        <li>The Black Ship</li>
                        <li>A Ritual in Stone</li>
                        <li>A Deeper Understanding</li>
                    </ul>
                </div>

                <br />
                <div className={party.subcontainer}>
                    <div className={party.charHeader}>
                        <p>Osoric Yanthus</p>

                        <button onClick={toggleEditCharPopupOpen} className={pop.addScen} style={{right: "60px"}}><img src="../../assets/edit_party.png" alt="editChar" width="24" height="24" /></button>
                        <button onClick={toggleDeleteCharPopupOpen} className={pop.addScen}><img src="../../assets/red_x.png" alt="deleteChar" width="24" height="24" /></button>
                    </div>

                    <hr />
                    <br />

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
                <Popup 
                    key={nextIndex++}
                    isOpen={isEditPartyPopupOpen} 
                    onClose={toggleEditPartyPopup} 
                    Component={EditPartyForm}
                />

                <Popup 
                    key={nextIndex++}
                    isOpen={isDeletePartyPopupOpen} 
                    onClose={toggleDeletePartyPopupOpen} 
                    Component={DeletePartyForm}
                />

                <Popup 
                    key={nextIndex++}
                    isOpen={isAddScenarioPopupOpen} 
                    onClose={toggleAddScenarioPopupOpen} 
                    Component={AddScenarioForm}
                />

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