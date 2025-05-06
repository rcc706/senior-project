import { useEffect, useState } from "react";
import party from "../styles/main.module.css";
import Party from "../components/Party";
import NewPartyForm from "../components/NewPartyForm";
import Navbar from "../components/NavBar";
import pop from "../styles/popup.module.css";
import useSessionData from "../components/useSessionData";
import axios from "axios";

// serverURL environment variable from the .env file to reduce hardcoding links everywhere
const serverURL = import.meta.env.VITE_SERVER_URL;

export default function UserParty() {

    // state for the party name
    const {username} = useSessionData();
    const [parties, setParties] = useState([]);

    // States that determine if the popup should be displayed or not 
    const [isNewPartyPopupOpen, setNewPartyPopupOpen] = useState(false);
    const toggleNewPartyPopup = () => setNewPartyPopupOpen(!isNewPartyPopupOpen);

    const [correctFormSubmission, setCorrectFormSubmission] = useState(false);

    // i swear to god, i need help, stackoverflow aint doin it
        // state that is set to true for when the user lands on page for first time (also refresh page)
    const [godpleasehelpme, setgodpleasehelpme] = useState(true);

    // data that is passed into the navbar component: 
        // the type of component, where to go, any custom styles, the content to display, and the id (for rendering)
    const NAVBAR_DATA = [
        {compType: 'Link', to: '/home', style: {fontSize: "30px", color: "#d4af37"} , content: 'GH', id: 1},
        {compType: 'NavLinks', content: [{compType: 'Link', to: '/party', content: 'PARTY', id: 4}, {compType: 'Link', to: '/game', content: 'GAME', id: 5}], id: 2},
        {compType: 'Link', to: '/profile', content: 'PROFILE', id: 3},
    ]; 

    // Kept getting uncaught promise errors with this axios post request, havent had this problem on other pages
    // but this may be different because getPartyNames is doing 2-3 db queries on the server. 
    // Based this code off of this link: https://stackoverflow.com/questions/73312100/correct-async-await-usage-with-axios
    // https://www.robinwieruch.de/react-hooks-fetch-data/
    const getParties = async () => {
        try {

            // awaiting on the post request to the server (trying to get the names of all the parties that belong to the user)
            const serverResponse = await axios.post(`${serverURL}/getPartyNames`, { uName: username?.username });

            // if the axios post request resolved, then set the parties array to the data of the response (an array)
            setParties(serverResponse.data);

            // user has visited page not for first time idk, womp womp
            setgodpleasehelpme(false);


        } catch (error) {
            // Won't be displaying errors like in the forms, so replaced with this to avoid updating the errors[] state all the time
            console.error(error);
        }
    }

    useEffect(() => {
        if ((correctFormSubmission || godpleasehelpme) && username) {
            getParties();
        }

        setCorrectFormSubmission(false);
    }, [correctFormSubmission, username]);

    return (
        <>
            {/* Navbar component and passing in navbar data variable */}
            <Navbar navbarLinks={NAVBAR_DATA}/>

            {parties.map((pty, index) => (
                <Party key={index} partyName={pty.PARTYNAME} partyDesc={"Scenarios Completed: "} partyId={index} renderParty={getParties}/>
            ))}

            <div className={party.container} style={{width: "20%"}}>
                <div className={party.subcontainer}>
                    <div className={party.flexCont}>
                        {/* Button that togggles the form and a popup that displays the create party form */}
                        <button onClick={toggleNewPartyPopup} className={party.userprofButton}>Create Party</button>
                        {isNewPartyPopupOpen && (
                            <div className={pop.popupOverlay}>
                                <div className={party.subcontainer}>
                                    <button onClick={toggleNewPartyPopup}>X</button>
                                    <NewPartyForm onClose={toggleNewPartyPopup} setCorrectFormSubmission={setCorrectFormSubmission}/>
                                </div>
                            </div>  
                        )}            
                    </div>
                </div>
            </div>
        </>
    );
}
