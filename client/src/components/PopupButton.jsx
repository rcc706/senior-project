import pop from "../styles/main.module.css";

const PopupButton = ({ onClick, label, popStyle}) => {
  return (
    <button onClick={onClick} className={pop.signlogButton} style={popStyle}>
      {label}
    </button>
  );
};

export default PopupButton;
