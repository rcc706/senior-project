import EnemyCard from "./EnemyCard";
import { useState } from "react";

export default function EnemyCardList() {
  const [enemyCards, setEnemyCards] = useState([]);
  const [selectedEnemy, setSelectedEnemy] = useState('');

  const addEnemyCard = () => {
    if (!selectedEnemy) {
      return; 
    }

    const enemyCard = {name: selectedEnemy, init: 0, rank: 'None', condition: 'None', id: Date.now() };
    
    setEnemyCards((prevCards) => [...prevCards, enemyCard]);
    setSelectedEnemy(''); 
  };

  return (
    <>
      <div style={{overflow: "visible"}}>
        <div style={{ display: "inline-flex", alignItems: 'center'}}>
          <form style={{flex: "1"}}>
            <select 
                name="addenemyDropdown" 
                style={{ width: "100%" }} 
                required
                value={selectedEnemy}
                onChange={(e) => setSelectedEnemy(e.target.value)} 
            >
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

          <button onClick={addEnemyCard} style={{fontSize: "20px"}}>Add Enemy</button>
        </div>

        {enemyCards.map((enemyCard) => (
          <EnemyCard 
            name={enemyCard.name} 
            init={enemyCard.init} 
            rank={enemyCard.rank} 
            condition={enemyCard.condition} 
            key={enemyCard.id} 
          />
        ))}
      </div>
    </>
  );
}
