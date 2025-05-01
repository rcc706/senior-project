import home from "../styles/main.module.css";
import Draggable from "react-draggable"
import { useRef } from "react";

export default function AddEnemyBtn() {

    // using useRef for the Draggable component that won't be rendered but still needs to be referenced
    const nodeRef = useRef(null);

    return (
        <>
            <Draggable nodeRef={nodeRef}>
                <div ref={nodeRef} className={home.container} style={{width: "20%"}}>
                    <div className={home.subcontainer}>
                        <div className={home.flexCont}>
                            <button className={home.userprofButton}>ADD ENEMY</button>                                       
                        </div>
                    </div>
                </div>
            </Draggable>
        </>
    );
}