import CharacterCard from "./CharacterCard";

export default function CharCardList(props) {

  let nextId = 1000;

  const charArr = [...props.charsArr]

  if (charArr.length === 0) {
    return null;
  }

  return (
    <>
        {charArr.map((charCard) => (
          <CharacterCard 
            name={charCard} 
            init={0} 
            rank={'None'} 
            condition={'None'} 
            key={nextId++} 
          />
        ))}
    </>
  );
}
