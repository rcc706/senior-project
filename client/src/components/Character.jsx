import party from "../styles/main.module.css";

export default function Character({ charClass, charName, currLevel, gainedXP, gold, totalPerks }) {

    // state to track of the new character form is open
    const [isNewCharacterPopupOpen, setNewCharacterPopupOpen] = useState(false);
    const toggleNewCharacterPopup = () => setNewCharacterPopupOpen(!isNewCharacterPopupOpen);

    return (
        <>
            <div className={party.subcontainer}>
                <nav>
                    <ul className={party.nav__links}>
                        {/* return the character name */}
                        <li><h3>{charName}</h3></li>

                        {/* return the character class */}
                        <li>{charClass}</li>
                    </ul>
                </nav>
            </div>
        </>
    )
}