import home from "../styles/main.module.css";
import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
const serverURL = import.meta.env.VITE_SERVER_URL;

export default function UpdatePasswordForm() {

    const [loggedOut, setLoggedOut] = useState(false);
    const [currPassword, setCurrPassword] = useState('');
    const [errors, setErrors] = useState([]);
    
    let nextId = 0;

    const handleLogout = async () => {
      try {
          const response = await axios.post("`${serverURL}/logout`", {}, {withCredentials: true});
  
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
        axios.post(`${serverURL}/deleteAccount`,
          { currPassword},
          { withCredentials: true }
        ).then(res => {
            setCurrPassword('');
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
            <h1 style={{textAlign: "center"}}>Delete Account</h1>
            <h2 style={{fontSize: "22px"}}>Enter Current Password to Confirm Account Deletion</h2>
            <h2 style={{fontSize: "22px"}}>All of Your Parties and Characters Will Be Deleted!</h2>

            <form onSubmit={submitHandler}>
                <input style={{width: "35%"}} type="password" name="currPassword" placeholder="Enter Current Password" value={currPassword} onChange={e => setCurrPassword(e.target.value)} required/>
                <button type="submit" className={home.deleteAccountBtn}  style={{width: "25%"}}>DELETE ACCOUNT</button>
            </form>
            
            <br />

            <div className="errorList">
                {errors.length > 0 && (
                    <ul>
                        {errors.map(error => (
                        <li key={error.id}>{error.message}</li>
                        ))}
                    </ul>
                )}
            </div>

            {loggedOut && <Navigate to="/" replace />}  
        </>
    )
}