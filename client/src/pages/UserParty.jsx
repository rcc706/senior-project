import { useState } from "react";
import party from "../styles/main.module.css";
import Party from "../components/Party";
import Popup from "../components/Popup";
import NewPartyForm from "../components/NewPartyForm";
import Navbar from "../components/NavBar";

export default function UserParty() {

    const [isNewPartyPopupOpen, setNewPartyPopupOpen] = useState(false);
    const toggleNewPartyPopup = () => setNewPartyPopupOpen(!isNewPartyPopupOpen);

    const NAVBAR_DATA = [
        {compType: 'Link', to: '/home', style: {fontSize: "30px", color: "#d4af37"} , content: 'GH', id: 1},
        {compType: 'NavLinks', content: [{compType: 'Link', to: '/party', content: 'PARTY', id: 4}, {compType: 'Link', to: '/game', content: 'GAME', id: 5}], id: 2},
        {compType: 'Link', to: '/profile', content: 'PROFILE', id: 3},
    ]; 

    return (
        <>
            <Navbar navbarLinks={NAVBAR_DATA}/>

            <Party partyName={"The Rebels"} partyDesc={"Scenarios Completed: "}/>

            <div className={party.container} style={{width: "20%"}}>
                <div className={party.subcontainer}>
                    <div className={party.flexCont}>
                        <button onClick={toggleNewPartyPopup} className={party.userprofButton}>Create Party</button>
                        <Popup 
                            isOpen={isNewPartyPopupOpen} 
                            onClose={toggleNewPartyPopup} 
                            Component={NewPartyForm}
                        />                    
                    </div>
                </div>
            </div>
        </>
    );
}
