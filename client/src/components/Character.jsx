import party from "../styles/main.module.css";

export default function Character({charClass, charName, charLevel, totalXP, charGold}) {

    // state to track of the new character form is open
    const [isEditCharacterPopupOpen, setEditCharacterPopupOpen] = useState(false);
    const toggleEditCharacterPopup = () => setEditCharacterPopupOpen(!isEditCharacterPopupOpen);

    const [isDeleteCharacterPopupOpen, setDeleteCharacterPopupOpen] = useState(false);
    const toggleDeleteCharacterPopup = () => setDeleteCharacterPopupOpen(!isDeleteCharacterPopupOpen);

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
                        <ul>
                            <li>Head: Iron Helmet</li>
                            <li>Chest: Chain Armor</li>
                            <li>One-Handed: Poison Dagger</li>
                            <li>Feet: Winged Shoes</li>
                        </ul>
                    </li>
                </ul>
            </div> 
        </>
    )
}