import home from "../styles/main.module.css";
import { useState } from "react";
import axios from "axios";

const serverURL = import.meta.env.VITE_SERVER_URL;

export default function GameChoosePartyForm({isOpen, onClose, updateCharsArray}) {
    
    const [pickedParty, setPickedParty] = useState('')
    const [errors, setErrors] = useState([]);

    const handleCharsArray = (chArr) => {
      updateCharsArray(chArr);
    }

    let nextId = 0;

    const submitHandler = e => {
      e.preventDefault();
      setErrors([]);
      axios.post(`${serverURL}/getPartyChars`,
        {partyName: pickedParty},
        {withCredentials: true}
      ).then(res => {
          setErrors([]);
          console.log(res.data.message);
          // console.log('hi world')
        }).catch (error => {
          console.error('Error occurred: ', error);
        }) 
    };



    return (
        <>
            <h1 className={home.gameh1} style={{textAlign: "center"}}>Choose a Party to Play</h1>
            <h2 className={home.gameh2} style={{fontSize: "22px"}}>Enter One of Your Party Names Below</h2>

            <form onSubmit={submitHandler}>
                <input type="text" name="gamePartyName" placeholder="Enter Party Name" value={pickedParty} onChange={e => setPickedParty(e.target.value)}required/>
                <button type="submit" className={home.signlogButton}  style={{width: "35%"}}>Choose PARTY</button>
            </form>

                {errors.length > 0 && (
                    <ul>
                        {errors.map(error => (
                            <li key={error.id}>{error.message}</li>
                        ))}
                    </ul>
                )}
        </>

    )
}