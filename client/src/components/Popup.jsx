import pop from "../styles/popup.module.css";
import main from "../styles/main.module.css";

const Popup = ({ isOpen, onClose, Component, popStyle}) => {
  if (!isOpen) return null;  

  return (
    <div className={pop.popupOverlay}>
      <div className={main.subcontainer}>
        <button onClick={onClose} style={popStyle}>X</button>
        <Component />
      </div>
    </div>
  );
};

export default Popup;
