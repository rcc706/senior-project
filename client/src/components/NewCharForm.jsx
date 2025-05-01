import home from "../styles/main.module.css";

// serverURL environment variable from the .env file to reduce hardcoding links everywhere
const serverURL = import.meta.env.VITE_SERVER_URL;

export default function NewCharForm() {
    return (
        <>
            <h1 style={{textAlign: "center"}}>Create New Character</h1>
            <h2 style={{fontSize: "22px"}}>Enter Character Name Below</h2>

            {/* Form to create a new character, select from 4 of the different races */}
            <form>
                <select name="charClass" required>
                    <option defaultValue={""}>Pick Hero Class</option>
                    <option value="hatchet">Inox Hatchet</option>
                    <option value="demolitionist">Quatryl Demolitionist</option>
                    <option value="voidwarden">Human Voidwarden</option>
                    <option value="redguard">Valrath Red Guard</option>
                </select>
                <input type="text" name="charname" placeholder="Enter Character Name" required />
                <button type="submit" className={home.signlogButton} style={{width: "40%"}}>CREATE CHARACTER</button>
            </form>
        </>
    )
}