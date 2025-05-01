import {Link} from "react-router-dom";
import home from "../styles/main.module.css";

export default function NavLinks(props) {

    // Array of navlinks (passed from the NavBar component)
    const NAV_DATA_ARR = props.navbarLinks;

    // a new constant that maps all (usually 2) the elements to a link component
    const navLinksArray = NAV_DATA_ARR.map((navLinkObject) => {

        // if the component type is a link, then return a link component containing the new key, the location to go to, and the content to display
        switch(navLinkObject.compType) {
            case "Link":
                return <Link 
                key={navLinkObject.id.toString()}
                to={navLinkObject.to} 
                >{navLinkObject.content}</Link>
        // else, return nothing
            default:
                return;
        }   
    });

    return (
        <>
            {/* Wrap the navlinks in a nav and ul for styling and return the new array state */}
            <nav>
                <ul className={home.nav__links}>
                    {navLinksArray}
                </ul>
            </nav>
        </>
    );
}