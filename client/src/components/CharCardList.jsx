import CharacterCard from "./CharacterCard";

export default function CharCardList(props) {

    // get the array of characters 
    const charArr = [...props.charsArr]

    // if there are no characters, return nothing
    if (charArr.length === 0) {
        return null;
    }

    let cardId = 3000;

    return (
        <>
            {/* create a new CharacterCard component with the default values */}
            {charArr.map((charCard) => (
                <CharacterCard key={cardId++} name={charCard.CHARNAME} init={0} rank={'None'} condition={'None'}/>
            ))}
        </>
    );
}