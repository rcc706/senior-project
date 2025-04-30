import { useState } from "react";
import party from "../styles/main.module.css";
import Draggable from "react-draggable"
import { useRef } from "react";
import pop from "../styles/popup.module.css";
import EditGameCharForm from "../components/EditCharGameForm";

export default function CharacterCard(props) {

    const [name, setName] = useState(props.name);
    const [init, setinit] = useState(props.init);
    const [hp, sethp] = useState(props.hp);
    const [xp, setxp] = useState(props.xp);
    const [gold, setGold] = useState(props.gold);
    const [condition, setCondition] = useState(props.condition);

    const [isEditCharGamePopupOpen, setEditCharGamePopupOpen] = useState(false);
    const toggleEditCharGamePopup = () => setEditCharGamePopupOpen(!isEditCharGamePopupOpen);

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

    const nodeRef = useRef(null);

    return (
        <>
            <Draggable nodeRef={nodeRef}>
                <div ref={nodeRef} className={party.subcontainer} style={{width: '20%'}}>
                    <div className={party.charHeader}>
                        <p>{name}</p>
                        <button onClick={toggleEditCharGamePopup} className={pop.addScen}><img src="../../assets/edit_party.png" alt="editScen" width="24" height="24" /></button>
                    </div>

                    <hr />
                    <br />

                    <ul>
                        <li>Initiative: {init}</li>
                        <li>Health Points: {hp}</li>
                        <li>XP Points: {xp}</li>
                        <li>Condition: {condition}</li>
                        <li>Gold: {gold}</li>
                    </ul>
                </div>                
            </Draggable>

            {isEditCharGamePopupOpen && (
                <div className={pop.popupOverlay}>
                    <div className={party.subcontainer}>
                        <button onClick={toggleEditCharGamePopup}>X</button>
                        <EditGameCharForm 
                            onClose={toggleEditCharGamePopup}
                            updateECgold={updateECgold}
                            updateECInit={updateECInit}
                            updateECHP={updateECHP}
                            updateECxp={updateECxp}
                            updateECCondition={updateECCondition}
                        />
                    </div>
                </div>
            )}
        </>
    );
}