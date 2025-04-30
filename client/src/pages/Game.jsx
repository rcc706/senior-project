import home from "../styles/main.module.css";
import pop from "../styles/popup.module.css";
import Navbar from "../components/NavBar";
import { useState } from "react";
import GameChoosePartyForm from '../components/GameChoosePartyForm';
import Popup from '../components/Popup';
// import AttackModBtn from '../components/AttackModBtn';
// import CharCardList from '../components/CharCardList';
import EnemyCardList from '../components/EnemyCardList';

export default function Game() {

    const [isGamePopupOpen, setGamePopupOpen] = useState(true);
    const toggleGamePopup = () => setGamePopupOpen(!isGamePopupOpen);
    const [charsArr, setCharsArr] = useState([]);

    const updateCharsArray = (chars) => {
      setCharsArr(chars)
    }

    const NAVBAR_DATA = [
        {compType: 'Link', to: '/home', style: {fontSize: "30px", color: "#d4af37"} , content: 'GH', id: 1},
        {compType: 'NavLinks', content: [{compType: 'Link', to: '/party', content: 'PARTY', id: 4}, {compType: 'Link', to: '/game', content: 'GAME', id: 5}], id: 2},
        {compType: 'Link', to: '/profile', content: 'PROFILE', id: 3},
    ]; 

    return (
        <>
            <Navbar navbarLinks={NAVBAR_DATA}/>

            {isGamePopupOpen && (
                <div className={pop.popupOverlay}>
                    <div className={home.subcontainer}>
                        <button onClick={toggleGamePopup}>X</button>
                        <GameChoosePartyForm
                            updateCharsArray={updateCharsArray}
                            onClose={toggleGamePopup}
                        />
                    </div>
                </div>
            )}  


            <Popup 
              isOpen={isGamePopupOpen} 
              onClose={toggleGamePopup} 
              Component={GameChoosePartyForm}
            />     

            <EnemyCardList />

            {/* <CharCardList charsArr={charsArr}/> */}
      </>
    );
}
