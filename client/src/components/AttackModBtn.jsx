import home from "../styles/main.module.css";
import Draggable from "react-draggable"
import { useRef } from "react";

export default function AttackModBtn(props) {

    // Using useRef to reference the draggable component that is not rendering
    const nodeRef = useRef(null);

    return (
        <>
            {/* Making the entire attack button draggable */}
            <Draggable nodeRef={nodeRef}>
                <div ref={nodeRef} className={home.container} style={{width: "20%"}}>
                    <div className={home.subcontainer}>
                        <div className={home.flexCont}>
                            <button className={home.userprofButton}>ATTACK MOD: </button>               
                        </div>
                    </div>
                </div>
            </Draggable>
        </>
    );
}