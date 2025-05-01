import pop from "../styles/popup.module.css";   // popup styles
import main from "../styles/main.module.css";   // main code styles

// This is the component that wraps most of the form components 
// This applies the styles like the overlay, preventing scrolling to the forms
    // - isOpen    --> Prop that determines if the form is open or not
    // - onClose   --> Function to do when the form is closed (X button)
    // - Component --> Usually of filename ...Form.jsx 
    // - popStyle  --> The style of the button
const Popup = ({ isOpen, onClose, Component, popStyle}) => {
    // if popup is not open, don't display anything
    if (!isOpen) {
        return null;  
    }

    return (
        <div className={pop.popupOverlay}>
            <div className={main.subcontainer}>
                <button onClick={onClose} style={popStyle}>X</button>
                <Component />
            </div>
        </div>
    );
};

// Exporting the Popup component
export default Popup;