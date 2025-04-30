import home from "../styles/main.module.css";
const serverURL = import.meta.env.VITE_SERVER_URL;

export default function DeleteCharForm() {

    
    return (
        <>
            <h1 style={{textAlign: "center"}}>Delete Character</h1>
            <h2 style={{fontSize: "22px"}}>This Character and all of its' Statistics Will Be Deleted!</h2>

            <form>
                <button type="submit" className={home.deleteAccountBtn}  style={{width: "25%"}}>DELETE CHARACTER</button>
            </form>
            
            <br />
        </>
    )
}