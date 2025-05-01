import CharacterCard from "./CharacterCard";

export default function CharCardList(props) {

    // get the array of characters 
    const charArr = [...props.charsArr]

    // if there are no characters, return nothing
    if (charArr.length === 0) {
        return null;
    }

    return (
        <>
            {/* Map each element of the characters array to a new CharacterCard component with default values and unique key */}
            {charArr.map((charCard) => (
                <CharacterCard name={charCard} init={0} rank={'None'} condition={'None'} key={Date.now()} />
            ))}
        </>
    );
}