import home from "../styles/main.module.css";
const serverURL = import.meta.env.VITE_SERVER_URL;
// `${serverURL}/`

export default function EditCharForm() {
    return (
        <>
            <h1 style={{textAlign: "center"}}>Edit Current Character</h1>
            <h2 style={{fontSize: "22px"}}>Change Character Stats and Items Below</h2>

            <form>
                <input type="number" name="charlevel" min="1" max="9" placeholder="Enter Level" required/> 
                <input type="number" name="charexp" min="0" required placeholder="Enter Experience Points"/> 
                <input type="number" name="chargold" min="0" required placeholder="Enter Gold"/> 

                <br />

                <select name="charitemhead" required>
                    <option defaultValue={""}>Pick Head Item</option>
                    <option value="hatchet">Inox Hatchet</option>
                    <option value="demolitionist">Quatryl Demolitionist</option>
                    <option value="voidwarden">Human Voidwarden</option>
                    <option value="redguard">Valrath Red Guard</option>
                </select>

                <select name="charitemchest" required>
                    <option defaultValue={""}>Pick Chest Item</option>
                    <option value="hatchet">Inox Hatchet</option>
                    <option value="demolitionist">Quatryl Demolitionist</option>
                    <option value="voidwarden">Human Voidwarden</option>
                    <option value="redguard">Valrath Red Guard</option>
                </select>

                <select name="charitemonehanded" required>
                    <option defaultValue={""}>Pick One-Handed Item</option>
                    <option value="hatchet">Inox Hatchet</option>
                    <option value="demolitionist">Quatryl Demolitionist</option>
                    <option value="voidwarden">Human Voidwarden</option>
                    <option value="redguard">Valrath Red Guard</option>
                </select>

                <select name="charitemfeet" required>
                    <option defaultValue={""}>Pick Feet Item</option>
                    <option value="hatchet">Inox Hatchet</option>
                    <option value="demolitionist">Quatryl Demolitionist</option>
                    <option value="voidwarden">Human Voidwarden</option>
                    <option value="redguard">Valrath Red Guard</option>
                </select>
                <button type="submit" className={home.signlogButton} style={{width: "40%"}}>EDIT CHARACTER</button>
            </form>
        </>
    )
}