import { useState } from "react";
import party from "../styles/main.module.css";
import Draggable from "react-draggable"
import { useRef } from "react";
import pop from "../styles/popup.module.css";
import EditGameCharForm from "../components/EditCharGameForm";

export default function CharacterCard(props) {

    // states for the character: 
        // name, initative, health points, experience points, gold, condition
    const [name, setName] = useState(props.name);
    const [init, setinit] = useState(props.init);
    const [hp, sethp] = useState(props.hp);
    const [xp, setxp] = useState(props.xp);
    const [gold, setGold] = useState(props.gold);
    const [condition, setCondition] = useState(props.condition);

    // state for tracking if the edit character form is open or not
    const [isEditCharGamePopupOpen, setEditCharGamePopupOpen] = useState(false);
    const toggleEditCharGamePopup = () => setEditCharGamePopupOpen(!isEditCharGamePopupOpen);

    // Functions that are passed to the child component (edit form) so that the states here can be updated
    const updateECgold = (value) => {
        setGold(value)
    }

    const updateECxp = (value) => {
        setxp(value)
    }

    const updateECInit = (value) => {
        setinit(value)
    }

    const updateECHP = (value) => {
        sethp(value)
    }

    const updateECCondition = (value) => {
        setCondition(value)
    }
    // --------------------------------------------------------------------------------------------

    // Using useRef to manage the components that aren't rendered (draggable)
    const nodeRef = useRef(null);

    return (
        <>
            {/* Draggable component, specifically if the user clicks anywhere on card, they can move it around */}
            <Draggable nodeRef={nodeRef}>
                <div ref={nodeRef} className={party.subcontainer} style={{width: '20%'}}>
                    <div className={party.charHeader}>
                        {/* Name of the character displayed at the top with a button to open the popup form */}
                        <p>{name}</p>
                        <button onClick={toggleEditCharGamePopup} className={pop.addScen}><img src="../../assets/edit_party.png" alt="editScen" width="24" height="24" /></button>
                    </div>

                    <hr />
                    <br />

                    {/* character states that will be updated from the form */}
                    <ul>
                        <li>Initiative: {init}</li>
                        <li>Health Points: {hp}</li>
                        <li>XP Points: {xp}</li>
                        <li>Condition: {condition}</li>
                        <li>Gold: {gold}</li>
                    </ul>
                </div>                
            </Draggable>

            {/* if the edit character game popup form is open, display it, else don't display it */}
            {isEditCharGamePopupOpen && (
                <div className={pop.popupOverlay}>
                    <div className={party.subcontainer}>
                        <button onClick={toggleEditCharGamePopup}>X</button>
                        <EditGameCharForm onClose={toggleEditCharGamePopup} updateECgold={updateECgold} updateECInit={updateECInit} updateECHP={updateECHP} updateECxp={updateECxp} updateECCondition={updateECCondition} />
                    </div>
                </div>
            )}
        </>
    );
}