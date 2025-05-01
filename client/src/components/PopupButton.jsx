import pop from "../styles/main.module.css"; // popup CSS styles

// Button component that takes in the props: 
    // - onClick  --> Function for what the button does when it is clicked
    // - label    --> The content that the button displays
    // - popStyle --> The inline styling of the button
const PopupButton = ({ onClick, label, popStyle}) => {
    return (<button onClick={onClick} className={pop.signlogButton} style={popStyle}>{label}</button>);
};

// exporting the component
export default PopupButton;