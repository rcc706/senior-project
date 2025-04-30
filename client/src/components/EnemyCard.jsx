import { useState } from "react";
import party from "../styles/main.module.css";
import Draggable from "react-draggable"
import { useRef } from "react";
import pop from "../styles/popup.module.css";
import EditGameEnemyForm from "../components/EditEnemyGameForm";

export default function EnemyCard(props) {

    const [name, setName] = useState(props.name);
    const [init, setinit] = useState(props.init);
    const [hp, sethp] = useState(props.hp);
    const [rank, setRank] = useState(props.rank);
    const [condition, setCondition] = useState(props.condition);

    const [isEditEnemyGamePopupOpen, setEditEnemyGamePopupOpen] = useState(false);
    const toggleEditEnemyGamePopup = () => setEditEnemyGamePopupOpen(!isEditEnemyGamePopupOpen);

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

    const nodeRef = useRef(null);

    return (
        <>
            <Draggable nodeRef={nodeRef}>
                <div ref={nodeRef} className={party.subcontainer} style={{width: '20%'}}>
                    <div className={party.charHeader}>
                        <p>{name}</p>
                        <button onClick={toggleEditEnemyGamePopup} className={pop.addScen}><img src="../../assets/edit_party.png" alt="editScen" width="24" height="24" /></button>
                    </div>

                    <hr />
                    <br />

                    <ul>
                        <li>Rank: {rank}</li>
                        <li>Initiative: {init}</li>
                        <li>Health Points: {hp}</li>
                        <li>Condition: {condition}</li>
                    </ul>
                </div>                
            </Draggable>

            {isEditEnemyGamePopupOpen && (
                <div className={pop.popupOverlay}>
                    <div className={party.subcontainer}>
                        <button onClick={toggleEditEnemyGamePopup}>X</button>
                        <EditGameEnemyForm 
                            onClose={toggleEditEnemyGamePopup}
                            updateECRank={updateECRank}
                            updateECInit={updateECInit}
                            updateECHP={updateECHP}
                            updateECCondition={updateECCondition}
                        />
                    </div>
                </div>
            )}  

        </>
    );
}