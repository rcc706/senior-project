import home from "../styles/main.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function UpdateEmailForm() {

    const [loggedOut, setLoggedOut] = useState(false);
    const [currEmail, setCurrEmail] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [errors, setErrors] = useState([]);
    
    let nextId = 0;

    const handleLogout = async () => {
      try {
          const response = await axios.post("http://174.138.47.229:3001/logout", {}, {withCredentials: true});
  
        if (response.status === 200) {
          setLoggedOut(true);
        } else {
          console.error("Logout failed");
        }
      } catch (error) {
        console.error("Logout error:", error);
      }
    };

    const submitHandler = e => {
        e.preventDefault();
        setErrors([]);
        axios.post('http://174.138.47.229:3001/updateEmail',
          { currEmail, newEmail},
          { withCredentials: true }
        ).then(res => {
            setCurrEmail('');
            setNewEmail('');
            setErrors([]);

            // successful update, logout
            handleLogout();
          }).catch(error => {
            if (error.response) {
              if (error.response.data.errors) {
                for (const elem of error.response.data.errors) {
                  const newMsg = elem.msg;
                  setErrors(prevErrors => [...prevErrors, { id: nextId++, message: newMsg }]);
                }
              }
              if (error.response.data.message) {
                setErrors(prevErrors => [...prevErrors, { id: nextId++, message: error.response.data.message }]);
              }
            } else {
              setErrors(prevErrors => [...prevErrors, { id: nextId++, message: "Error connecting to the server" }]);
            }
          });
      };
    
    return (
        <>
            <h1 style={{textAlign: "center"}}>Update Email</h1>
            <h2 style={{fontSize: "22px"}}>Enter Both Current And New Emails Below</h2>

            <form onSubmit={submitHandler}>
                <input style={{width: "35%"}} type="email" name="currentEmail" placeholder="Enter Current Email" value={currEmail} onChange={e => setCurrEmail(e.target.value)} required/>
                <input style={{width: "35%"}} type="email" name="newEmail" placeholder="Enter New Email" value={newEmail} onChange={e => setNewEmail(e.target.value)} required/>
                <button type="submit" className={home.signlogButton}  style={{width: "25%"}}>UPDATE EMAIL</button>
            </form>

            {errors.length > 0 && (
                <ul>
                    {errors.map(error => (
                    <li key={error.id}>{error.message}</li>
                    ))}
                </ul>
            )}

            {loggedOut && <Navigate to="/" replace />}  
        </>
    )
}