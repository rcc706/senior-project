import { useState } from "react";
import party from "../styles/main.module.css";
import Draggable from "react-draggable"
import { useRef } from "react";
import pop from "../styles/popup.module.css";
import EditGameEnemyForm from "../components/EditEnemyGameForm";

export default function EnemyCard(props) {

    // States to track the changing of information displayed in the enemy card
        // name of the enemy, the initiative, health points, rank, and condition
    const [name, setName] = useState(props.name);
    const [init, setinit] = useState(props.init);
    const [hp, sethp] = useState(props.hp);
    const [rank, setRank] = useState(props.rank);
    const [condition, setCondition] = useState(props.condition);

    // State to track if the form popup is open or not
    const [isEditEnemyGamePopupOpen, setEditEnemyGamePopupOpen] = useState(false);
    const toggleEditEnemyGamePopup = () => setEditEnemyGamePopupOpen(!isEditEnemyGamePopupOpen);

    // Functions that are passed to the child component (edit form) so that the states here can be updated
    const updateECRank = (value) => {
        setRank(value)
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
    // -----------------------------------------------------------------------------------------------------

    // Using useRef to manage the components that aren't rendered (draggable)
    const nodeRef = useRef(null);

    return (
        <>
            {/* Draggable component, specifically if the user clicks anywhere on card, they can move it around */}
            <Draggable nodeRef={nodeRef}>
                <div ref={nodeRef} className={party.subcontainer} style={{width: '20%'}}>
                    <div className={party.charHeader}>
                        {/* Name of the enemy displayed at the top with a button to open the popup form */}
                        <p>{name}</p> 
                        <button onClick={toggleEditEnemyGamePopup} className={pop.addScen}><img src="../../assets/edit_party.png" alt="editScen" width="24" height="24" /></button>
                    </div>

                    <hr />
                    <br />

                    {/* enemy states that will be updated from the form */}
                    <ul>
                        <li>Rank: {rank}</li>
                        <li>Initiative: {init}</li>
                        <li>Health Points: {hp}</li>
                        <li>Condition: {condition}</li>
                    </ul>
                </div>                
            </Draggable>

            {/* if the edit enemy game popup form is open, display it, else don't display it */}
            {isEditEnemyGamePopupOpen && (
                <div className={pop.popupOverlay}>
                    <div className={party.subcontainer}>
                        <button onClick={toggleEditEnemyGamePopup}>X</button>
                        <EditGameEnemyForm onClose={toggleEditEnemyGamePopup} updateECRank={updateECRank} updateECInit={updateECInit} updateECHP={updateECHP} updateECCondition={updateECCondition} />
                    </div>
                </div>
            )}  

        </>
    );
}