import home from "../styles/main.module.css";

export default function EditCharGameForm({updateECgold, onClose, updateECInit, updateECxp, updateECCondition, updateECHP}) {

    const handleGold = (event) => {
        updateECgold(event.target.value);
    }

    const handleInit = (event) => {
        updateECInit(event.target.value);
    }

    const handleHp = (event) => {
        updateECHP(event.target.value);
    }

    const handleXp = (event) => {
        updateECxp(event.target.value);
    }

    const handleCondition = (event) => {
        updateECCondition(event.target.value);
    }

    const submitHandler = e => {
        e.preventDefault();
        onClose();
    }

    return (
        <>
            <h1 className={home.gameh1} style={{textAlign: "center"}}>Edit Character Game Stats</h1>
            <h2 className={home.gameh2} style={{fontSize: "22px"}}>Change Character Game Stats Below</h2>

            <form>
                <input onChange={handleInit} type="number" name="enemyinit" min="1" max="99" placeholder="Enter Initiative" /> 
                <input onChange={handleHp} type="number" name="enemyhp" min="0" placeholder="Enter Health Points"/> 
                <input onChange={handleXp} type="number" name="enemyxp" min="0" placeholder="Enter Experience Points"/> 
                <input onChange={handleGold} type="number" name="chargold" min="0" placeholder="Enter Gold" /> 

                <select name="enemycondition" onChange={handleCondition}>
                    <option defaultValue={"None"}>Pick Condition</option>
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
                <button type="submit" onClick={submitHandler} className={home.signlogButton} style={{width: "40%"}}>EDIT STATS</button>
            </form>
        </>
    )
}