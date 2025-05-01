import home from "../styles/main.module.css";

export default function EditEnemyGameForm({updateECRank, onClose, updateECInit, updateECHP, updateECCondition}) {

    // Functions that are passed from the parent component to update the parent states
    const handleRank = (event) => {
        updateECRank(event.target.value);
    }

    const handleInit = (event) => {
        updateECInit(event.target.value);
    }

    const handleHp = (event) => {
        updateECHP(event.target.value);
    }

    const handleCondition = (event) => {
        updateECCondition(event.target.value);
    }
    // ----------------------------------------------------------------------------------

    // Handles the form submission --> stops the form from reloading the page and closes the popup
    const submitHandler = e => {
        e.preventDefault();
        onClose();
    }


    return (
        <>
            <h1 className={home.gameh1} style={{textAlign: "center"}}>Edit Enemy Game Stats</h1>
            <h2 className={home.gameh2} style={{fontSize: "22px"}}>Change Enemy Game Stats Below</h2>

            {/* Form to change the values of enemy rank (difficulty), initiative, health, and conditions */}
            <form>
                {/* Updates rank if one is selected */}
                <select name="enemyrank" onChange={handleRank}>
                    <option defaultValue={"None"}>Pick Rank</option>
                    <option value="Elite">Elite</option>
                    <option value="Normal">Normal</option>
                </select>

                {/* Updates initiative if number is inputted */}
                <input onChange={handleInit} type="number" name="enemyinit" min="1" max="99" placeholder="Enter Initiative" /> 

                {/* Updates health points if number is inputted */}
                <input onChange={handleHp} type="number" name="enemyhp" min="0" placeholder="Enter Health Points"/> 

                {/* Updates the condition if one is selected */}
                <select name="enemycondition" onChange={handleCondition}>
                    <option>Pick Condition</option>
                    <option value="None">None</option>
                    <option value="Bless">Bless</option>
                    <option value="Curse">Curse</option>
                    <option value="Disarm">Disarm</option>
                    <option value="Immobilize">Immobilize</option>
                    <option value="Muddle">Muddle</option>
                    <option value="Poison">Poison</option>
                    <option value="Strengthen">Strengthen</option>
                    <option value="Stun">Stun</option>
                    <option value="Wound">Wound</option>
                </select>

                {/* Calls the submit handler when submitted and closes the form */}
                <button type="submit" onClick={submitHandler} className={home.signlogButton} style={{width: "40%"}}>EDIT STATS</button>
            </form>
        </>
    )
}