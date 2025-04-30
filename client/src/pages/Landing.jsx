import land from "../styles/main.module.css";
import Navbar from "../components/NavBar";

export default function Landing() {

    // Navbar data to be put in to the navbar component below
        // component type, where to, custom styling, content displayed, and id for rendering
    const NAVBAR_DATA = [
        {compType: 'Link', to: '/', style: {fontSize: "30px", color: "#d4af37"} , content: 'GH', id: 1},
        {compType: 'NavLinks', content: [{compType: 'Link', to: '/signup', content: 'SIGNUP', id: 4}, {compType: 'Link', to: '/login', content: 'LOGIN', id: 5}], id: 2},
    ]; 

    return (
        <>
            {/* navbar component that contains the navbar data variable and displays the navbar on top of the screen (landing, signup, login) */}
            <Navbar navbarLinks={NAVBAR_DATA}/>

            <div className={land.container} style={{maxWidth: "80%"}}>
                <h1 style={{textAlign: "center"}}>Gloomhaven Game Assist</h1>
                <h2 style={{textAlign: "center"}}>Join Fellow Adventurers and Forge Your Path</h2>
                <hr style={{color: "#d4af37"}} />
                <div className={land.subcontainer}>
                    {/* intro paragraph about what the gloomhaven is to introduce new users */}
                    <p>Welcome to Gloomhaven Game Assist! </p>
                    <p>This is a website that helps people who play the board game Gloomhaven. Gloomhaven is a cooperative board game where a group of people can play a campaign of different scenarios. The campaign is the overarching story of the game that players will go through to beat the game. Each scenario is like a chapter in the campaign. In the scenarios, the party of characters take their turns performing different actions like fighting enemies, healing each other, moving around the board, and even collecting loot. During the enemies’ turn, they can also attack the characters, move around, and heal each other. </p>
                </div>

                <div className={land.subcontainer}>
                    {/* Explaining a bit more about some game mechanics like turns and the initiative number */}
                    <p>Each turn, whether an enemy or a character, is determined by their initiative. The initiative is a number that is on one of the cards where a player (and enemies) must pull each turn. The characters can choose one of the two initiative from the cards to pick, while the enemies have one action card that has their initiative on it. The lower the initiative, the quicker they can go to take their turn. The higher the initiative, the longer it will take for them to take their turn. Since Gloomhaven can become a complex game very quickly, and it is very difficult to remember every single rule, the goal of this website is to help alleviate some of the load of rules that is put on to the players. </p>
                </div>
            </div>
        </>
    );
}