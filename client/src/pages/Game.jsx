import home from "../styles/main.module.css";
import pop from "../styles/popup.module.css";
import Navbar from "../components/NavBar";
import { useState } from "react";
import GameChoosePartyForm from '../components/GameChoosePartyForm';
import Popup from '../components/Popup';
import EnemyCardList from '../components/EnemyCardList';

export default function Game() {

    // states that determine if the popup for the party selection (doesn't work) is open
    const [isGamePopupOpen, setGamePopupOpen] = useState(true);
    const toggleGamePopup = () => setGamePopupOpen(!isGamePopupOpen);

    // would be the state that is used to update the chars from the party that is selected
    const [charsArr, setCharsArr] = useState([]);

    const updateCharsArray = (chars) => {
      setCharsArr(chars)
    }

    // navbar data that is passed into the navbar component
        // component type, where to, custom style, content displayed, id for rendering
    const NAVBAR_DATA = [
        {compType: 'Link', to: '/home', style: {fontSize: "30px", color: "#d4af37"} , content: 'GH', id: 1},
        {compType: 'NavLinks', content: [{compType: 'Link', to: '/party', content: 'PARTY', id: 4}, {compType: 'Link', to: '/game', content: 'GAME', id: 5}], id: 2},
        {compType: 'Link', to: '/profile', content: 'PROFILE', id: 3},
    ]; 

    return (
        <>
            {/* navbar component displaying the navbar data (home, party, game, profile) */}
            <Navbar navbarLinks={NAVBAR_DATA}/>

            {/* if the game popup state is set to true, keep the popup displayed, else don't display it*/}
            {isGamePopupOpen && (
                <div className={pop.popupOverlay}>
                    <div className={home.subcontainer}>
                        {/* close the form */}
                        <button onClick={toggleGamePopup}>X</button>

                        {/* Component that is the form that users would selec their party from */}
                        {/* Passing in the function to update the characters array and the method that closes the form */}
                        <GameChoosePartyForm
                            updateCharsArray={updateCharsArray}
                            onClose={toggleGamePopup}
                        />
                    </div>
                </div>
            )}  

            {/* displays the game choose party popup form whenever the user opens the page */}
            <Popup 
              isOpen={isGamePopupOpen} 
              onClose={toggleGamePopup} 
              Component={GameChoosePartyForm}
            />     

            {/* Lists the enemy (cards)  that can be moved around and updated. */}
            <EnemyCardList />

            {/* <CharCardList charsArr={charsArr}/> */}
      </>
    );
}
