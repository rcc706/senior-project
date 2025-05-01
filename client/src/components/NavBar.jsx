import {Link} from "react-router-dom";
import NavLinks from "../components/NavLinks";
import parse from 'html-react-parser';

export default function Navbar(props) {

    // data for the navbar: 
        // the type of component, where to go, any custom styles, the content to display, and the id (for rendering)
    const NAV_DATA_ARR = props.navbarLinks;

    // Looping through each object element in the NAV_DATA_ARR and mapping them to a component 
        // Link --> On the farther sides of the screen (GH, profile, logout)
        // Navlinks --> Groups of links (signup + login | party + game)
    const navLinksArray = NAV_DATA_ARR.map((navLinkObject) => {

        // If the component type is a link, return a Link compoment with the passed key, where to, the style, and the parsed content
        switch(navLinkObject.compType) {
            case "Link":
                return <Link 
                key={navLinkObject.id.toString()}
                to={navLinkObject.to} 
                style={navLinkObject.style}
                >{parse(navLinkObject.content)}</Link>
            // if the component type is a NavLink, set the key and the different navLinks (which will be returned similarly as here)
            case "NavLinks":
                return <NavLinks 
                key={navLinkObject.id.toString} 
                navbarLinks={navLinkObject.content}/>
            // if neither above, return nothing
            default:
                return;
        }   
    });

    return (
        <>
            {/* Wrap the navlinksarray variable in a header (for styling) and return it */}
            <header>
                {navLinksArray}
            </header>
        </>
    );
}