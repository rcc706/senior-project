import home from "../styles/main.module.css";
import Draggable from "react-draggable"
import { useRef } from "react";

export default function AddEnemyBtn() {

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