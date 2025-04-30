import party from "../styles/main.module.css";

export default function Character({ charClass, charName, currLevel, gainedXP, gold, totalPerks }) {

    // const [isEditPartyPopupOpen, setEditPartyPopupOpen] = useState(false);
    // const toggleEditPartyPopup = () => setEditPartyPopupOpen(!isEditPartyPopupOpen);

    // const [isNewCharacterPopupOpen, setNewCharacterPopupOpen] = useState(false);
    // const toggleNewCharacterPopup = () => setNewCharacterPopupOpen(!isNewCharacterPopupOpen);

    return (
        <>
            <div className={party.subcontainer}>
                <nav>
                    <ul className={party.nav__links}>
                        <li><h3>{charName}</h3></li>
                        <li>{charClass}</li>
                    </ul>
                </nav>
            </div>
        </>
    )
}