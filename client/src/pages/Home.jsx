import Navbar from "../components/NavBar";
import home from "../styles/main.module.css";

export default function Home() {

    const NAVBAR_DATA = [
        {compType: 'Link', to: '/home', style: {fontSize: "30px", color: "#d4af37"} , content: 'GH', id: 1},
        {compType: 'NavLinks', content: [{compType: 'Link', to: '/party', content: 'PARTY', id: 4}, {compType: 'Link', to: '/game', content: 'GAME', id: 5}], id: 2},
        {compType: 'Link', to: '/profile', content: 'PROFILE', id: 3},
    ]; 


    return (
        <>
            <Navbar navbarLinks={NAVBAR_DATA}/>

            <div className={home.container} style={{maxWidth: "80%"}}>
                <h1 style={{textAlign: "center"}}>Gloomhaven Game Assist</h1>
                <hr style={{color: "#d4af37"}} />

                    <div className={home.subcontainer}>
                        <p>Welcome back to Gloomhaven Game Assist!</p>
                        <p>Whether you play by yourself, or within a party of other people, this website is here to help you. Although it is not connected to the database, you can check out the party page to see an example of what it would look like. There, you would be able to create a new party, edit the party name, and add whatever complete scenarios you’ve done to it. You would also be able to add up to four different characters to that party where each character would have  a name, race, items, gold, experience, level, etc. You would also be able to edit those stats about the character as well as its items. However, that party page is just for looks right now, and you can’t do those things. </p>
                    </div>

                    <div className={home.subcontainer}>
                        <p>Onto the game page, there you can select some enemies that you are currently fighting in whichever scenario you are playing. You can do so by clicking on the “Pick Enemy” drop down, select an enemy, then press on the “Add enemy” button. From there, a new enemy will appear with blank stats for rank (elite or normal), initiative, health, and conditions. You can click on the three little dots in the top right of the enemy card to edit those stats. Finally, you can also go over to the user profile page where you can view your currently registered email and logout from the website. </p>
                    </div>
            </div>
        </>
    );
}
