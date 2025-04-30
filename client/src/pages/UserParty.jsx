import { useState } from "react";
import party from "../styles/main.module.css";
import Party from "../components/Party";
import Popup from "../components/Popup";
import NewPartyForm from "../components/NewPartyForm";
import Navbar from "../components/NavBar";

export default function UserParty() {

    // States that determine if the popup should be displayed or not 
    const [isNewPartyPopupOpen, setNewPartyPopupOpen] = useState(false);
    const toggleNewPartyPopup = () => setNewPartyPopupOpen(!isNewPartyPopupOpen);

    // data that is passed into the navbar component: 
        // the type of component, where to go, any custom styles, the content to display, and the id (for rendering)
    const NAVBAR_DATA = [
        {compType: 'Link', to: '/home', style: {fontSize: "30px", color: "#d4af37"} , content: 'GH', id: 1},
        {compType: 'NavLinks', content: [{compType: 'Link', to: '/party', content: 'PARTY', id: 4}, {compType: 'Link', to: '/game', content: 'GAME', id: 5}], id: 2},
        {compType: 'Link', to: '/profile', content: 'PROFILE', id: 3},
    ]; 

    return (
        <>
            {/* Navbar component and passing in navbar data variable */}
            <Navbar navbarLinks={NAVBAR_DATA}/>

            {/* Static component displaying a "party" */}
            <Party partyName={"The Rebels"} partyDesc={"Scenarios Completed: "}/>

            <div className={party.container} style={{width: "20%"}}>
                <div className={party.subcontainer}>
                    <div className={party.flexCont}>
                        {/* Button that togggles the form and a popup that displays the create party form */}
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
