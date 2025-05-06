import home from "../styles/main.module.css";

// server url from .env file to reduce hardcoding links
const serverURL = import.meta.env.VITE_SERVER_URL;

export default function EditCharForm() {
    return (
        <>
            <h1 style={{textAlign: "center"}}>Edit Current Character</h1>
            <h2 style={{fontSize: "22px"}}>Change Character Stats and Items Below</h2>

            <form>
                {/* Update the character level, total expierence, and gold*/}
                <input type="number" name="charlevel" min="1" max="9" placeholder="Enter Level"/> 
                <input type="number" name="charexp" min="0" placeholder="Enter Experience Points"/> 
                <input type="number" name="chargold" min="0" placeholder="Enter Gold"/> 

                <br />

                {/* select a head item  */}
                <select name="charitemhead" >
                    <option defaultValue={"None"}>Pick Head Item</option>
                    <option value="hatchet">Inox Hatchet</option>
                    <option value="demolitionist">Quatryl Demolitionist</option>
                    <option value="voidwarden">Human Voidwarden</option>
                    <option value="redguard">Valrath Red Guard</option>
                </select>

                {/* select chest item */}
                <select name="charitemchest" >
                    <option defaultValue={"None"}>Pick Chest Item</option>
                    <option value="hatchet">Inox Hatchet</option>
                    <option value="demolitionist">Quatryl Demolitionist</option>
                    <option value="voidwarden">Human Voidwarden</option>
                    <option value="redguard">Valrath Red Guard</option>
                </select>

                {/* select one-handed item */}
                <select name="charitemonehanded" >
                    <option defaultValue={"None"}>Pick One-Handed Item</option>
                    <option value="hatchet">Inox Hatchet</option>
                    <option value="demolitionist">Quatryl Demolitionist</option>
                    <option value="voidwarden">Human Voidwarden</option>
                    <option value="redguard">Valrath Red Guard</option>
                </select>

                {/* select feet item */}
                <select name="charitemfeet" >
                    <option defaultValue={"None"}>Pick Feet Item</option>
                    <option value="hatchet">Inox Hatchet</option>
                    <option value="demolitionist">Quatryl Demolitionist</option>
                    <option value="voidwarden">Human Voidwarden</option>
                    <option value="redguard">Valrath Red Guard</option>
                </select>

                {/* button that will submit the form and close the popup */}
                <button type="submit" className={home.signlogButton} style={{width: "40%"}}>EDIT CHARACTER</button>
            </form>
        </>
    )
}