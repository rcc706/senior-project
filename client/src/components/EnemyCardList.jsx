import EnemyCard from "./EnemyCard";
import { useState } from "react";

export default function EnemyCardList() {

    // State to manage the enemy cards that are in the list
    const [enemyCards, setEnemyCards] = useState([]);

    // state of the enemy that is selected from the drop down menu
    const [selectedEnemy, setSelectedEnemy] = useState('');

    // If there isn't an ememy selected, don't return anything
    const addEnemyCard = () => {
    if (!selectedEnemy) {
        return; 
    }

    // Set the default display for any picked enemy, just have the name changed using Data.now() for unique keys
    const enemyCard = {name: selectedEnemy, init: 0, rank: 'None', condition: 'None', id: Date.now() };
    
    // set the current array state of enemies to add an additional enemy card
    setEnemyCards((oldEnemyCardsArr) => [...oldEnemyCardsArr, enemyCard]);

    // clear the selected enemy state
    setSelectedEnemy(''); 
  };

  return (
    <>
        {/* Drop down menu that contains all the enemy names */}
        <div style={{overflow: "visible"}}>
        <div style={{ display: "inline-flex", alignItems: 'center'}}>
            <form style={{flex: "1"}}>
                {/* List of all the enemy names, if one is selected set the selected enemy state to the enemy name selected */}
                <select name="addenemyDropdown" style={{ width: "100%" }} required value={selectedEnemy} onChange={(e) => setSelectedEnemy(e.target.value)}>
                    <option value="">Pick Enemy</option>
                    <option value="Black Imp">Black Imp</option>
                    <option value="Black Sludge">Black Sludge</option>
                    <option value="Blood Horror">Blood Horror</option>
                    <option value="Blood Imp">Blood Imp</option>
                    <option value="Blood Monstrosity">Blood Monstrosity</option>
                    <option value="Blood Tumor">Blood Tumor</option>
                    <option value="Chaos Demon">Chaos Demon</option>
                    <option value="First of the Order">First of the Order</option>
                    <option value="Giant Viper">Giant Viper</option>
                    <option value="Living Corpse">Living Corpse</option>
                    <option value="Living Spirit">Living Spirit</option>
                    <option value="Rat Monstrosity">Rat Monstrosity</option>
                    <option value="Stone Golem">Stone Golem</option>
                    <option value="Vermling Raider">Vermling Raider</option>
                    <option value="Vermling Scout">Vermling Scout</option>
                    <option value="Zealot">Zealot</option>
                </select>
            </form>

            {/* Button that adds the selected enemy name to the array of enemies */}
            <button onClick={addEnemyCard} style={{fontSize: "20px"}}>Add Enemy</button>
        </div>

        {/* Take all the enemies that are selected and display them as a new enemy card component */}
        {enemyCards.map((enemyCard) => (
            <EnemyCard name={enemyCard.name} init={enemyCard.init} rank={enemyCard.rank} condition={enemyCard.condition} key={enemyCard.id} />
        ))}
      </div>
    </>
  );
}
