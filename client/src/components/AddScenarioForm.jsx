import home from "../styles/main.module.css";

export default function AddScenarioForm() {
    return (
        <>
            <h1 style={{textAlign: "center"}}>Add a Completed Scenario</h1>
            <h2 style={{fontSize: "22px"}}>Select a Scenario Below</h2>

            {/* Form with a select drop down menu for people to select the scenario they want to add */}
            <form>
                <select id="compScen" name="compScen" required>
                    <option defaultValue={""}>Pick Scenario</option>
                    <option value="hatchet">Inox Hatchet</option>
                    <option value="demolitionist">Quatryl Demolitionist</option>
                    <option value="voidwarden">Human Voidwarden</option>
                    <option value="redguard">Valrath Red Guard</option>
                </select>

                {/* closes the form and submits the data */}
                <button type="submit" className={home.signlogButton} style={{width: "40%"}}>ADD COMPLETED SCENARIO</button>
            </form>
        </>
    )
}